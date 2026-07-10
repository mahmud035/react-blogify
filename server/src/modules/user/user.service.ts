import { User } from './user.model';
import { Blog } from '../blog/blog.model';
import { AppError } from '../../utils/AppError';
import { uploadImageBuffer } from '../../utils/cloudinary';
import type { UpdateProfileInput } from './user.validation';

const AUTHOR_FIELDS = 'firstName lastName avatar';

/**
 * Returns a user's public profile enriched with their authored blogs and
 * populated favourites. Throws 404 if the user does not exist.
 */
const getUserProfile = async (userId: string) => {
  const user = await User.findById(userId).populate({
    path: 'favourites',
    select: 'title tags thumbnail',
  });
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  const blogs = await Blog.find({ author: userId })
    .sort({ createdAt: -1 })
    .populate('author', AUTHOR_FIELDS);

  return { ...user.toJSON(), blogs };
};

/**
 * Updates the authenticated user's own profile. Optionally replaces the avatar
 * (uploaded to Cloudinary). Only whitelisted fields are applied.
 */
const updateProfile = async (
  userId: string,
  data: UpdateProfileInput,
  file?: Express.Multer.File,
) => {
  const update: Record<string, unknown> = { ...data };

  if (file) {
    update.avatar = await uploadImageBuffer(file.buffer, 'avatars');
  }

  const user = await User.findByIdAndUpdate(userId, update, {
    returnDocument: 'after',
    runValidators: true,
  });
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  return user.toJSON();
};

/**
 * Uploads a new avatar for the authenticated user and returns the updated user.
 */
const uploadAvatar = async (userId: string, file?: Express.Multer.File) => {
  if (!file) {
    throw new AppError(400, 'Avatar image is required');
  }
  const avatar = await uploadImageBuffer(file.buffer, 'avatars');
  const user = await User.findByIdAndUpdate(
    userId,
    { avatar },
    { returnDocument: 'after' },
  );
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  return user.toJSON();
};

export const userService = { getUserProfile, updateProfile, uploadAvatar };
