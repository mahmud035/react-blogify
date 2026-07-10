import type { Request, Response } from 'express';
import app from '../src/app';
import { connectDB } from '../src/config/db';

/**
 * Vercel serverless entry. Ensures the (cached) Mongo connection is ready
 * before delegating the request to the Express app.
 */
export default async function handler(
  req: Request,
  res: Response,
): Promise<void> {
  await connectDB();
  app(req, res);
}
