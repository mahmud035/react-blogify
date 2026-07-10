import type { HydratedDocument } from 'mongoose';
import { Blog } from './blog.model';
import type { IBlog } from './blog.interface';
import { User } from '../user/user.model';
import { AppError } from '../../utils/AppError';
import { uploadImageBuffer } from '../../utils/cloudinary';
import type {
  CreateBlogInput,
  UpdateBlogInput,
} from './blog.validation';

const AUTHOR_FIELDS = 'firstName lastName avatar';
const CONTENT_PREVIEW = 180;

/** Blog list-card shape: populated author + truncated content. */
function toCard(doc: HydratedDocument<IBlog>): Record<string, unknown> {
  const obj = doc.toJSON() as unknown as Record<string, unknown>;
  const content = obj.content;
  if (typeof content === 'string' && content.length > CONTENT_PREVIEW) {
    obj.content = `${content.slice(0, CONTENT_PREVIEW)}...`;
  }
  return obj;
}

async function findBlogOr404(
  blogId: string,
): Promise<HydratedDocument<IBlog>> {
  const blog = await Blog.findById(blogId);
  if (!blog) throw new AppError(404, 'Blog not found');
  return blog;
}

/** Paginated blog list (newest first) with truncated content. */
const getBlogs = async ({ page, limit }: { page: number; limit: number }) => {
  const [total, docs] = await Promise.all([
    Blog.countDocuments(),
    Blog.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', AUTHOR_FIELDS),
  ]);
  return { total, page, limit, blogs: docs.map(toCard) };
};

/** Single blog with full content; enriched with isFavourite/isLiked when authed. */
const getSingleBlog = async (blogId: string, userId?: string) => {
  const blog = await Blog.findById(blogId)
    .populate('author', AUTHOR_FIELDS)
    .populate('comments.author', AUTHOR_FIELDS);
  if (!blog) throw new AppError(404, 'Blog not found');

  const result = blog.toJSON() as unknown as Record<string, unknown>;
  result.isLiked = userId
    ? blog.likes.some((id) => id.equals(userId))
    : false;

  let isFavourite = false;
  if (userId) {
    const user = await User.findById(userId).select('favourites');
    isFavourite = Boolean(user?.favourites.some((id) => id.equals(blogId)));
  }
  result.isFavourite = isFavourite;
  return result;
};

const createBlog = async (
  authorId: string,
  data: CreateBlogInput,
  file?: Express.Multer.File,
) => {
  const thumbnail = file
    ? await uploadImageBuffer(file.buffer, 'thumbnails')
    : null;

  const blog = await Blog.create({
    title: data.title,
    content: data.content,
    tags: data.tags,
    thumbnail,
    author: authorId,
    likes: [],
    comments: [],
  });
  await blog.populate('author', AUTHOR_FIELDS);
  return blog.toJSON();
};

const updateBlog = async (
  blogId: string,
  authorId: string,
  data: UpdateBlogInput,
  file?: Express.Multer.File,
) => {
  const blog = await findBlogOr404(blogId);
  if (!blog.author.equals(authorId)) {
    throw new AppError(403, 'You can only edit your own blog');
  }

  if (data.title !== undefined) blog.title = data.title;
  if (data.content !== undefined) blog.content = data.content;
  if (data.tags !== undefined) blog.tags = data.tags;
  if (file) blog.thumbnail = await uploadImageBuffer(file.buffer, 'thumbnails');

  await blog.save();
  await blog.populate('author', AUTHOR_FIELDS);
  await blog.populate('comments.author', AUTHOR_FIELDS);
  return blog.toJSON();
};

const deleteBlog = async (blogId: string, authorId: string) => {
  const blog = await findBlogOr404(blogId);
  if (!blog.author.equals(authorId)) {
    throw new AppError(403, 'You can only delete your own blog');
  }
  await blog.deleteOne();
  // Clean up dangling favourites referencing this blog.
  await User.updateMany(
    { favourites: blogId },
    { $pull: { favourites: blogId } },
  );
};

/** Top blogs by like count. */
const getPopularBlogs = async (limit: number) => {
  const docs = await Blog.find().populate('author', AUTHOR_FIELDS);
  const sorted = docs
    .sort((a, b) => b.likes.length - a.likes.length)
    .slice(0, limit);
  return { total: sorted.length, blogs: sorted.map(toCard) };
};

/** The authenticated user's favourite blogs. */
const getFavouriteBlogs = async (userId: string) => {
  const user = await User.findById(userId).populate({
    path: 'favourites',
    populate: { path: 'author', select: AUTHOR_FIELDS },
  });
  if (!user) throw new AppError(404, 'User not found');
  const blogs = user.toJSON().favourites ?? [];
  return { total: (blogs as unknown[]).length, blogs };
};

/** Toggle like for a blog by the authenticated user. */
const toggleLike = async (blogId: string, userId: string) => {
  const blog = await findBlogOr404(blogId);
  const index = blog.likes.findIndex((id) => id.equals(userId));
  const isLiked = index === -1;
  if (isLiked) blog.likes.push(userId as unknown as (typeof blog.likes)[number]);
  else blog.likes.splice(index, 1);
  await blog.save();
  return { isLiked, likes: blog.likes };
};

/** Toggle a blog in the authenticated user's favourites. */
const toggleFavourite = async (blogId: string, userId: string) => {
  const blog = await findBlogOr404(blogId);
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, 'User not found');

  const index = user.favourites.findIndex((id) => id.equals(blogId));
  const isFavourite = index === -1;
  if (isFavourite) {
    user.favourites.push(blogId as unknown as (typeof user.favourites)[number]);
  } else {
    user.favourites.splice(index, 1);
  }
  await user.save();
  await blog.populate('author', AUTHOR_FIELDS);
  return { ...toCard(blog), isFavourite };
};

const addComment = async (
  blogId: string,
  userId: string,
  content: string,
) => {
  const blog = await findBlogOr404(blogId);
  blog.comments.push({ content, author: userId } as never);
  await blog.save();
  await blog.populate('comments.author', AUTHOR_FIELDS);
  return { comments: blog.toJSON().comments };
};

const deleteComment = async (
  blogId: string,
  commentId: string,
  userId: string,
) => {
  const blog = await findBlogOr404(blogId);
  const comment = blog.comments.id(commentId);
  if (!comment) throw new AppError(404, 'Comment not found');

  const isCommentAuthor = comment.author.equals(userId);
  const isBlogAuthor = blog.author.equals(userId);
  if (!isCommentAuthor && !isBlogAuthor) {
    throw new AppError(403, 'You cannot delete this comment');
  }

  comment.deleteOne();
  await blog.save();
  await blog.populate('comments.author', AUTHOR_FIELDS);
  return { comments: blog.toJSON().comments };
};

export const blogService = {
  getBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getPopularBlogs,
  getFavouriteBlogs,
  toggleLike,
  toggleFavourite,
  addComment,
  deleteComment,
};
