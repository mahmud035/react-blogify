import type { ErrorRequestHandler } from 'express';
import { MulterError } from 'multer';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';
import { config } from '../config';

type ErrorSource = { path: string; message: string };

/**
 * Central error translator. Maps known error types (Zod, Mongoose, JWT,
 * Multer, AppError) to the correct status + message inside the response
 * envelope. Anything unrecognised becomes a 500.
 */
export const globalErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorSources: ErrorSource[] = [];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation error';
    errorSources = err.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = 'Validation error';
    errorSources = Object.values(err.errors).map((e) => ({
      path: e.path,
      message: e.message,
    }));
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid ${err.path}: ${String(err.value)}`;
  } else if (
    typeof err === 'object' &&
    err !== null &&
    (err as { code?: number }).code === 11000
  ) {
    statusCode = 409;
    const dupField = Object.keys(
      (err as { keyValue?: Record<string, unknown> }).keyValue ?? {},
    )[0];
    message = dupField
      ? `${dupField} already exists`
      : 'Duplicate key error';
  } else if (err instanceof MulterError) {
    statusCode = 400;
    message =
      err.code === 'LIMIT_FILE_SIZE'
        ? 'File too large (max 5 MB)'
        : err.message;
  } else if (err instanceof jwt.JsonWebTokenError) {
    statusCode = 401;
    message = 'Invalid or expired token';
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errorSources,
    ...(config.isProduction
      ? {}
      : { stack: err instanceof Error ? err.stack : undefined }),
  });
};
