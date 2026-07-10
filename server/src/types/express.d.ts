import type { AccessTokenPayload } from '../utils/jwt';

declare global {
  namespace Express {
    interface Request {
      /** Populated by the auth middleware from the access-token cookie. */
      user?: AccessTokenPayload;
    }
  }
}

export {};
