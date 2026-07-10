import type { Response } from 'express';

/** Uniform success envelope returned by every endpoint (per charter). */
export type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};

export function sendResponse<T>(
  res: Response,
  payload: { statusCode: number; message: string; data: T },
): void {
  const body: ApiResponse<T> = {
    statusCode: payload.statusCode,
    success: payload.statusCode >= 200 && payload.statusCode < 300,
    message: payload.message,
    data: payload.data,
  };
  res.status(payload.statusCode).json(body);
}
