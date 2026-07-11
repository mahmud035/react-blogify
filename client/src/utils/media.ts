/**
 * Media helpers. Thumbnails/avatars are now full Cloudinary URLs, so these are
 * passthroughs with graceful placeholders when the value is null.
 */

export function initialOf(name?: string | null): string {
  return name?.trim().slice(0, 1).toUpperCase() || '?';
}

export function getAvatarUrl(
  avatar: string | null | undefined,
  name?: string | null,
): string {
  if (avatar) return avatar;
  return `https://dummyimage.com/200x200/00d991/ffffff&text=${initialOf(name)}`;
}

export function getThumbnailUrl(thumbnail: string | null | undefined): string {
  return thumbnail || 'https://dummyimage.com/600x400/030317/ffffff&text=React+Blogify';
}

export const AVATAR_FALLBACK =
  'https://placehold.co/200?text=Reload+Page';
export const THUMBNAIL_FALLBACK = 'https://placehold.co/600x400';
