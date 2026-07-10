import multer from 'multer';
import { AppError } from '../utils/AppError';

/**
 * In-memory upload (no disk) so buffers can be streamed straight to Cloudinary
 * — required on Vercel's read-only serverless filesystem. Images only, 5 MB cap.
 */
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new AppError(400, 'Only image files are allowed'));
    }
  },
});
