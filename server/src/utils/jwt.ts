import jwt, { type SignOptions } from 'jsonwebtoken';
import type { CookieOptions } from 'express';
import { config } from '../config';

export type AccessTokenPayload = {
  userId: string;
  email: string;
  type: 'access';
};

export type RefreshTokenPayload = {
  userId: string;
  type: 'refresh';
};

export const ACCESS_COOKIE = 'accessToken';
export const REFRESH_COOKIE = 'refreshToken';

export function signAccessToken(payload: {
  userId: string;
  email: string;
}): string {
  return jwt.sign(
    { ...payload, type: 'access' } satisfies AccessTokenPayload,
    config.jwt.accessSecret,
    { expiresIn: config.jwt.accessExpiresIn as SignOptions['expiresIn'] },
  );
}

export function signRefreshToken(payload: { userId: string }): string {
  return jwt.sign(
    { ...payload, type: 'refresh' } satisfies RefreshTokenPayload,
    config.jwt.refreshSecret,
    { expiresIn: config.jwt.refreshExpiresIn as SignOptions['expiresIn'] },
  );
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const decoded = jwt.verify(token, config.jwt.accessSecret) as AccessTokenPayload;
  if (decoded.type !== 'access') throw new Error('Invalid token type');
  return decoded;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  const decoded = jwt.verify(
    token,
    config.jwt.refreshSecret,
  ) as RefreshTokenPayload;
  if (decoded.type !== 'refresh') throw new Error('Invalid token type');
  return decoded;
}

/**
 * Cross-site cookie config: the client and API live on different Vercel
 * domains, so production requires `SameSite=None; Secure`. Locally we use
 * `lax` over http.
 */
function baseCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: config.isProduction ? 'none' : 'lax',
    path: '/',
  };
}

const FIFTEEN_MINUTES = 15 * 60 * 1000;
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export const accessCookieOptions = (): CookieOptions => ({
  ...baseCookieOptions(),
  maxAge: FIFTEEN_MINUTES,
});

export const refreshCookieOptions = (): CookieOptions => ({
  ...baseCookieOptions(),
  maxAge: SEVEN_DAYS,
});

/** Options used when clearing cookies (must match attributes sans maxAge). */
export const clearCookieOptions = (): CookieOptions => baseCookieOptions();
