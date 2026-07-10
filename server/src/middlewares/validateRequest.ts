import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';
import { catchAsync } from '../utils/catchAsync';

/**
 * Validates `req.body` against a Zod schema and replaces it with the parsed
 * (typed, coerced) value. Zod failures bubble to the global error handler,
 * which formats them into the envelope.
 */
export const validateRequest =
  (schema: ZodType): RequestHandler =>
  catchAsync(async (req, _res, next) => {
    req.body = await schema.parseAsync(req.body);
    next();
  });
