/* eslint-disable no-console */
/**
 * Migrates the legacy lowdb dataset (database/db.json) into MongoDB and uploads
 * the on-disk avatar/thumbnail images to Cloudinary.
 *
 * - Old 20-char hex ids are remapped to fresh ObjectIds (a stable old→new map).
 * - Denormalized author/like/comment/favourite snapshots become real refs.
 * - Passwords are inserted as-is (already bcrypt-hashed); insertMany skips the
 *   pre-save hash hook, so they are NOT re-hashed and existing logins still work.
 * - Images upload to Cloudinary when credentials are set; otherwise they are
 *   stored as null and a warning is printed (re-run with credentials for media).
 *
 *   npm run seed
 */
import fs from 'node:fs';
import path from 'node:path';
import mongoose, { Types } from 'mongoose';
import { config } from '../src/config';
import { connectDB } from '../src/config/db';
import { User } from '../src/modules/user/user.model';
import { Blog } from '../src/modules/blog/blog.model';
import { uploadImageBuffer, type UploadFolder } from '../src/utils/cloudinary';

type LegacyUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  bio?: string;
  password: string;
  favourites?: { id: string }[];
};

type LegacyComment = {
  id: string;
  content: string;
  author: { id: string };
};

type LegacyBlog = {
  id: string;
  title: string;
  content: string;
  thumbnail: string | null;
  author: { id: string };
  tags: string | string[];
  likes?: { id: string }[];
  comments?: LegacyComment[];
  createdAt?: string;
};

const DB_PATH = path.resolve(__dirname, '../database/db.json');
const UPLOADS = path.resolve(__dirname, '../public/uploads');

const uploadCache = new Map<string, string | null>();

/** Uploads a local seed image to Cloudinary, caching by filename. */
async function migrateImage(
  filename: string | null,
  folder: UploadFolder,
): Promise<string | null> {
  if (!filename) return null;
  if (!config.cloudinary.isConfigured) return null;
  if (uploadCache.has(filename)) return uploadCache.get(filename)!;

  const sub = folder === 'avatars' ? 'avatar' : 'blog';
  const filePath = path.join(UPLOADS, sub, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`  ! missing image on disk: ${sub}/${filename}`);
    uploadCache.set(filename, null);
    return null;
  }
  const url = await uploadImageBuffer(fs.readFileSync(filePath), folder);
  uploadCache.set(filename, url);
  return url;
}

function normalizeTags(tags: string | string[]): string[] {
  if (Array.isArray(tags)) return tags.map((t) => String(t).trim()).filter(Boolean);
  return String(tags ?? '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

async function seed(): Promise<void> {
  const raw = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) as {
    users: LegacyUser[];
    blogs: LegacyBlog[];
  };

  await connectDB();
  console.log('[seed] connected to Mongo');

  if (!config.cloudinary.isConfigured) {
    console.warn(
      '[seed] Cloudinary NOT configured — images will be null. Re-run with credentials for media.',
    );
  }

  await Promise.all([User.deleteMany({}), Blog.deleteMany({})]);
  console.log('[seed] cleared users + blogs');

  // --- Users ---
  const userMap = new Map<string, Types.ObjectId>();
  const userDocs = [];
  for (const u of raw.users) {
    const _id = new Types.ObjectId();
    userMap.set(u.id, _id);
    userDocs.push({
      _id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      avatar: await migrateImage(u.avatar, 'avatars'),
      bio: u.bio ?? '',
      password: u.password,
      favourites: [] as Types.ObjectId[],
    });
  }
  await User.insertMany(userDocs);
  console.log(`[seed] inserted ${userDocs.length} users`);

  // --- Blogs ---
  const blogMap = new Map<string, Types.ObjectId>();
  const blogDocs = [];
  for (const b of raw.blogs) {
    const author = userMap.get(b.author.id);
    if (!author) {
      console.warn(`  ! skipping blog ${b.id}: unknown author`);
      continue;
    }
    const _id = new Types.ObjectId();
    blogMap.set(b.id, _id);
    const created = b.createdAt ? new Date(b.createdAt) : new Date();
    blogDocs.push({
      _id,
      title: b.title,
      content: b.content,
      thumbnail: await migrateImage(b.thumbnail, 'thumbnails'),
      author,
      tags: normalizeTags(b.tags),
      likes: (b.likes ?? [])
        .map((l) => userMap.get(l.id))
        .filter((x): x is Types.ObjectId => Boolean(x)),
      comments: (b.comments ?? [])
        .map((c) => {
          const cAuthor = userMap.get(c.author.id);
          return cAuthor
            ? { content: c.content, author: cAuthor, createdAt: created }
            : null;
        })
        .filter((x): x is NonNullable<typeof x> => x !== null),
      createdAt: created,
      updatedAt: created,
    });
  }
  await Blog.insertMany(blogDocs, { timestamps: false });
  console.log(`[seed] inserted ${blogDocs.length} blogs`);

  // --- User favourites (needs blog map) ---
  const favOps = [];
  for (const u of raw.users) {
    const favourites = (u.favourites ?? [])
      .map((f) => blogMap.get(f.id))
      .filter((x): x is Types.ObjectId => Boolean(x));
    if (favourites.length > 0) {
      favOps.push({
        updateOne: {
          filter: { _id: userMap.get(u.id) },
          update: { $set: { favourites } },
        },
      });
    }
  }
  if (favOps.length > 0) {
    await User.bulkWrite(favOps);
    console.log(`[seed] linked favourites for ${favOps.length} users`);
  }

  const imagesUploaded = [...uploadCache.values()].filter(Boolean).length;
  console.log(
    `[seed] done. images uploaded: ${imagesUploaded} (cached ${uploadCache.size} filenames)`,
  );
  await mongoose.disconnect();
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[seed] failed:', err);
    process.exit(1);
  });
