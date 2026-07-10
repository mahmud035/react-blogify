import type { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * Wraps an async route handler so rejected promises are forwarded to the
 * global error handler instead of crashing the process.
 */
export const catchAsync =
  (fn: RequestHandler): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
