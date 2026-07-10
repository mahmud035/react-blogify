import { User } from '../user/user.model';
import { AppError } from '../../utils/AppError';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../../utils/jwt';
import type { AuthResult, AuthTokens } from './auth.interface';
import type { LoginInput, RegisterInput } from './auth.validation';

function issueTokens(user: { id: string; email: string }): AuthTokens {
  return {
    accessToken: signAccessToken({ userId: user.id, email: user.email }),
    refreshToken: signRefreshToken({ userId: user.id }),
  };
}

/**
 * Registers a new user. Rejects duplicate emails; the password is hashed by the
 * model's pre-save hook.
 */
const register = async (payload: RegisterInput): Promise<AuthResult> => {
  const existing = await User.findOne({ email: payload.email });
  if (existing) {
    throw new AppError(409, 'A user with this email already exists');
  }

  const user = await User.create(payload);
  const tokens = issueTokens({ id: user.id, email: user.email });

  return { user: user.toJSON(), tokens };
};

/**
 * Authenticates a user by email + password and issues a fresh token pair.
 */
const login = async (payload: LoginInput): Promise<AuthResult> => {
  const user = await User.findOne({ email: payload.email }).select(
    '+password',
  );
  if (!user) {
    throw new AppError(401, 'Invalid email or password');
  }

  const isMatch = await user.comparePassword(payload.password);
  if (!isMatch) {
    throw new AppError(401, 'Invalid email or password');
  }

  const tokens = issueTokens({ id: user.id, email: user.email });
  return { user: user.toJSON(), tokens };
};

/**
 * Verifies a refresh token, confirms the user still exists, and issues a new
 * token pair (rotation).
 */
const refresh = async (refreshToken: string): Promise<AuthResult> => {
  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    throw new AppError(401, 'Invalid or expired refresh token');
  }

  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new AppError(401, 'User no longer exists');
  }

  const tokens = issueTokens({ id: user.id, email: user.email });
  return { user: user.toJSON(), tokens };
};

export const authService = { register, login, refresh };
