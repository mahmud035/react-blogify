import type { RequestHandler } from 'express';
import { sendResponse } from '../utils/sendResponse';

export const notFound: RequestHandler = (req, res) => {
  sendResponse(res, {
    statusCode: 404,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    data: null,
  });
};
