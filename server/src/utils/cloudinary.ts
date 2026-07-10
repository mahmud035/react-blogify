import {
  v2 as cloudinary,
  type UploadApiResponse,
} from 'cloudinary';
import { config } from '../config';
import { AppError } from './AppError';

if (config.cloudinary.isConfigured) {
  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
    secure: true,
  });
}

export type UploadFolder = 'avatars' | 'thumbnails';

/**
 * Uploads an in-memory image buffer to Cloudinary and resolves the secure URL.
 * Folder/publicId follow the charter's kebab-case asset-isolation convention:
 * `clients/sakib/react-blogify/{avatars|thumbnails}`.
 */
export async function uploadImageBuffer(
  buffer: Buffer,
  folder: UploadFolder,
): Promise<string> {
  if (!config.cloudinary.isConfigured) {
    throw new AppError(
      500,
      'Cloudinary is not configured (missing CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET)',
    );
  }

  const targetFolder = `${config.cloudinary.folder}/${folder}`;

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: targetFolder, resource_type: 'image' },
      (error, res) => {
        if (error) return reject(error);
        if (!res) return reject(new Error('Cloudinary returned no result'));
        resolve(res);
      },
    );
    stream.end(buffer);
  });

  return result.secure_url;
}

export { cloudinary };
