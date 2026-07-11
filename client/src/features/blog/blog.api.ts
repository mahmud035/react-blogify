import { api, unwrap } from '@/lib/axios';
import type { Blog, BlogListPage, Comment } from '@/types/entities';

/** Popular / favourites payload (no pagination). */
export interface BlogCollection {
  total: number;
  blogs: Blog[];
}

export function getBlogs(page: number, limit = 5) {
  return unwrap<BlogListPage>(
    api.get('/blogs', { params: { page, limit } }),
  );
}

export function getPopularBlogs(limit = 5) {
  return unwrap<BlogCollection>(
    api.get('/blogs/popular', { params: { limit } }),
  );
}

export function getFavouriteBlogs() {
  return unwrap<BlogCollection>(api.get('/blogs/favourites'));
}

export function getBlog(blogId: string) {
  return unwrap<Blog>(api.get(`/blogs/${blogId}`));
}

export function createBlog(formData: FormData) {
  return unwrap<{ blog: Blog }>(api.post('/blogs', formData));
}

export function updateBlog(blogId: string, formData: FormData) {
  return unwrap<{ blog: Blog }>(api.patch(`/blogs/${blogId}`, formData));
}

export function deleteBlog(blogId: string) {
  return unwrap<null>(api.delete(`/blogs/${blogId}`));
}

export function toggleLike(blogId: string) {
  return unwrap<{ isLiked: boolean; likes: string[] }>(
    api.post(`/blogs/${blogId}/like`),
  );
}

export function toggleFavourite(blogId: string) {
  return unwrap<Blog & { isFavourite: boolean }>(
    api.patch(`/blogs/${blogId}/favourite`),
  );
}

export function addComment(blogId: string, content: string) {
  return unwrap<{ comments: Comment[] }>(
    api.post(`/blogs/${blogId}/comment`, { content }),
  );
}

export function deleteComment(blogId: string, commentId: string) {
  return unwrap<{ comments: Comment[] }>(
    api.delete(`/blogs/${blogId}/comment/${commentId}`),
  );
}
