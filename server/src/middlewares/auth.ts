import type { RequestHandler } from 'express';
import { AppError } from '../utils/AppError';
import { ACCESS_COOKIE, verifyAccessToken } from '../utils/jwt';

/**
 * Requires a valid access-token cookie. Attaches the decoded payload to
 * `req.user`. Responds 401 on missing/invalid/expired tokens (the client's
 * interceptor refreshes on 401).
 */
export const requireAuth: RequestHandler = (req, _res, next) => {
  const token = req.cookies?.[ACCESS_COOKIE];
  if (!token) {
    return next(new AppError(401, 'Authentication required'));
  }
  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    next(new AppError(401, 'Invalid or expired token'));
  }
};

/**
 * Attaches `req.user` when a valid access-token cookie is present, but never
 * rejects. Used by endpoints whose response is enriched for authed users
 * (e.g. a blog's `isFavourite`).
 */
export const optionalAuth: RequestHandler = (req, _res, next) => {
  const token = req.cookies?.[ACCESS_COOKIE];
  if (token) {
    try {
      req.user = verifyAccessToken(token);
    } catch {
      // Ignore — treat as an anonymous request.
    }
  }
  next();
};
