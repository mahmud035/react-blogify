import { Router } from 'express';
import { sendResponse } from '../utils/sendResponse';
import { authRoutes } from '../modules/auth/auth.route';
import { profileRoutes } from '../modules/user/user.route';
import { blogRoutes } from '../modules/blog/blog.route';
import { searchRoutes } from '../modules/search/search.route';

const router = Router();

router.get('/health', (_req, res) => {
  sendResponse(res, {
    statusCode: 200,
    message: 'API is healthy',
    data: { status: 'ok', timestamp: new Date().toISOString() },
  });
});

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/blogs', blogRoutes);
router.use('/search', searchRoutes);

export default router;
