import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { upload } from '../../middlewares/upload';
import { userController } from './user.controller';
import { userValidation } from './user.validation';

const router = Router();

router.get('/:userId', userController.getUserProfile);

router.patch(
  '/',
  requireAuth,
  upload.single('avatar'),
  validateRequest(userValidation.updateProfileSchema),
  userController.updateProfile,
);

router.post(
  '/avatar',
  requireAuth,
  upload.single('avatar'),
  userController.uploadAvatar,
);

export const profileRoutes = router;
