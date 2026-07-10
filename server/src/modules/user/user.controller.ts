import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { userService } from './user.service';

/**
 * GET /profile/:userId — public profile with the user's blogs and favourites.
 */
const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const data = await userService.getUserProfile(String(req.params.userId));
  sendResponse(res, {
    statusCode: 200,
    message: 'User profile retrieved',
    data,
  });
});

/**
 * PATCH /profile — update the authenticated user's own profile (+ optional avatar).
 */
const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateProfile(
    req.user!.userId,
    req.body,
    req.file,
  );
  sendResponse(res, {
    statusCode: 200,
    message: 'Profile updated',
    data: { user },
  });
});

/**
 * POST /profile/avatar — upload/replace the authenticated user's avatar.
 */
const uploadAvatar = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.uploadAvatar(req.user!.userId, req.file);
  sendResponse(res, {
    statusCode: 200,
    message: 'Avatar updated',
    data: { user },
  });
});

export const userController = { getUserProfile, updateProfile, uploadAvatar };
