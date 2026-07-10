import { Router } from 'express';
import { requireAuth, optionalAuth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { upload } from '../../middlewares/upload';
import { blogController } from './blog.controller';
import { blogValidation } from './blog.validation';

const router = Router();

// Specific routes before the `/:postId` param route.
router.get('/', blogController.getAllBlogs);
router.get('/popular', blogController.getPopularBlogs);
router.get('/favourites', requireAuth, blogController.getFavouriteBlogs);

router.post(
  '/',
  requireAuth,
  upload.single('thumbnail'),
  validateRequest(blogValidation.createBlogSchema),
  blogController.createBlog,
);

router.get('/:postId', optionalAuth, blogController.getSingleBlog);

router.patch(
  '/:postId',
  requireAuth,
  upload.single('thumbnail'),
  validateRequest(blogValidation.updateBlogSchema),
  blogController.updateBlog,
);

router.delete('/:postId', requireAuth, blogController.deleteBlog);

router.post('/:postId/like', requireAuth, blogController.likeBlog);
router.patch('/:postId/favourite', requireAuth, blogController.toggleFavourite);

router.post(
  '/:postId/comment',
  requireAuth,
  validateRequest(blogValidation.commentSchema),
  blogController.addComment,
);
router.delete(
  '/:postId/comment/:commentId',
  requireAuth,
  blogController.deleteComment,
);

export const blogRoutes = router;
