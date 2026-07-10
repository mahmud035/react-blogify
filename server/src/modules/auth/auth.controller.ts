import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AppError } from '../../utils/AppError';
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  accessCookieOptions,
  clearCookieOptions,
  refreshCookieOptions,
} from '../../utils/jwt';
import { authService } from './auth.service';
import type { AuthTokens } from './auth.interface';

/** Writes the access + refresh JWTs as HTTP-only cookies. */
function setAuthCookies(res: Response, tokens: AuthTokens): void {
  res.cookie(ACCESS_COOKIE, tokens.accessToken, accessCookieOptions());
  res.cookie(REFRESH_COOKIE, tokens.refreshToken, refreshCookieOptions());
}

/**
 * Registers a new user, sets auth cookies, and returns the created user.
 */
const register = catchAsync(async (req: Request, res: Response) => {
  const { user, tokens } = await authService.register(req.body);
  setAuthCookies(res, tokens);
  sendResponse(res, {
    statusCode: 201,
    message: 'Registration successful',
    data: { user },
  });
});

/**
 * Authenticates a user, sets auth cookies, and returns the user.
 */
const login = catchAsync(async (req: Request, res: Response) => {
  const { user, tokens } = await authService.login(req.body);
  setAuthCookies(res, tokens);
  sendResponse(res, {
    statusCode: 200,
    message: 'Login successful',
    data: { user },
  });
});

/**
 * Rotates the token pair using the refresh-token cookie.
 */
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const token = req.cookies?.[REFRESH_COOKIE];
  if (!token) {
    throw new AppError(401, 'Refresh token missing');
  }
  const { user, tokens } = await authService.refresh(token);
  setAuthCookies(res, tokens);
  sendResponse(res, {
    statusCode: 200,
    message: 'Token refreshed',
    data: { user },
  });
});

/**
 * Clears the auth cookies.
 */
const logout = catchAsync(async (_req: Request, res: Response) => {
  res.clearCookie(ACCESS_COOKIE, clearCookieOptions());
  res.clearCookie(REFRESH_COOKIE, clearCookieOptions());
  sendResponse(res, {
    statusCode: 200,
    message: 'Logout successful',
    data: null,
  });
});

export const authController = { register, login, refreshToken, logout };
