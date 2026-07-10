import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { blogService } from './blog.service';

function toPositiveInt(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

/** GET /blogs — paginated list. */
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const page = toPositiveInt(req.query.page, 1);
  const limit = toPositiveInt(req.query.limit, 10);
  const data = await blogService.getBlogs({ page, limit });
  sendResponse(res, { statusCode: 200, message: 'Blogs retrieved', data });
});

/** GET /blogs/popular — top blogs by likes. */
const getPopularBlogs = catchAsync(async (req: Request, res: Response) => {
  const limit = toPositiveInt(req.query.limit, 5);
  const data = await blogService.getPopularBlogs(limit);
  sendResponse(res, { statusCode: 200, message: 'Popular blogs retrieved', data });
});

/** GET /blogs/favourites — the authenticated user's favourites. */
const getFavouriteBlogs = catchAsync(async (req: Request, res: Response) => {
  const data = await blogService.getFavouriteBlogs(req.user!.userId);
  sendResponse(res, { statusCode: 200, message: 'Favourite blogs retrieved', data });
});

/** GET /blogs/:postId — single blog (enriched when authed). */
const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const data = await blogService.getSingleBlog(
    String(req.params.postId),
    req.user?.userId,
  );
  sendResponse(res, { statusCode: 200, message: 'Blog retrieved', data });
});

/** POST /blogs — create. */
const createBlog = catchAsync(async (req: Request, res: Response) => {
  const blog = await blogService.createBlog(
    req.user!.userId,
    req.body,
    req.file,
  );
  sendResponse(res, {
    statusCode: 201,
    message: 'Blog created successfully',
    data: { blog },
  });
});

/** PATCH /blogs/:postId — update (author only). */
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const blog = await blogService.updateBlog(
    String(req.params.postId),
    req.user!.userId,
    req.body,
    req.file,
  );
  sendResponse(res, { statusCode: 200, message: 'Blog updated', data: { blog } });
});

/** DELETE /blogs/:postId — delete (author only). */
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  await blogService.deleteBlog(String(req.params.postId), req.user!.userId);
  sendResponse(res, { statusCode: 200, message: 'Blog deleted', data: null });
});

/** POST /blogs/:postId/like — toggle like. */
const likeBlog = catchAsync(async (req: Request, res: Response) => {
  const data = await blogService.toggleLike(
    String(req.params.postId),
    req.user!.userId,
  );
  sendResponse(res, { statusCode: 200, message: 'Like toggled', data });
});

/** PATCH /blogs/:postId/favourite — toggle favourite. */
const toggleFavourite = catchAsync(async (req: Request, res: Response) => {
  const data = await blogService.toggleFavourite(
    String(req.params.postId),
    req.user!.userId,
  );
  sendResponse(res, { statusCode: 200, message: 'Favourite toggled', data });
});

/** POST /blogs/:postId/comment — add a comment. */
const addComment = catchAsync(async (req: Request, res: Response) => {
  const data = await blogService.addComment(
    String(req.params.postId),
    req.user!.userId,
    req.body.content,
  );
  sendResponse(res, { statusCode: 201, message: 'Comment added', data });
});

/** DELETE /blogs/:postId/comment/:commentId — delete a comment. */
const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const data = await blogService.deleteComment(
    String(req.params.postId),
    String(req.params.commentId),
    req.user!.userId,
  );
  sendResponse(res, { statusCode: 200, message: 'Comment deleted', data });
});

export const blogController = {
  getAllBlogs,
  getPopularBlogs,
  getFavouriteBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  toggleFavourite,
  addComment,
  deleteComment,
};
