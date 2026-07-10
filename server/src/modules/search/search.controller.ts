import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AppError } from '../../utils/AppError';
import { searchService } from './search.service';

/** GET /search?q= — search blogs by title. */
const search = catchAsync(async (req: Request, res: Response) => {
  const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
  if (!q) {
    throw new AppError(400, 'Please provide a search query (?q=)');
  }
  const data = await searchService.searchBlogs(q);
  sendResponse(res, { statusCode: 200, message: 'Search results', data });
});

export const searchController = { search };
