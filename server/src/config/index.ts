import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ quiet: true });

/**
 * Environment schema. Validated once at boot so a misconfigured deploy fails
 * fast and loudly instead of surfacing as a runtime 500 later.
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  CLIENT_URL: z.string().default('http://localhost:5173'),

  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),

  JWT_ACCESS_SECRET: z.string().min(1, 'JWT_ACCESS_SECRET is required'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_SECRET: z.string().min(1, 'JWT_REFRESH_SECRET is required'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

  // Cloudinary is optional at boot (media features fail with a clear error if
  // unset) so the API can run locally before credentials are provisioned.
  CLOUDINARY_CLOUD_NAME: z.string().default('assetvault'),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
    .join('\n');
  // eslint-disable-next-line no-console
  console.error(`\n[config] Invalid environment variables:\n${issues}\n`);
  process.exit(1);
}

const env = parsed.data;

export const config = {
  env: env.NODE_ENV,
  isProduction: env.NODE_ENV === 'production',
  port: env.PORT,
  clientUrl: env.CLIENT_URL,
  mongoUri: env.MONGODB_URI,
  jwt: {
    accessSecret: env.JWT_ACCESS_SECRET,
    accessExpiresIn: env.JWT_ACCESS_EXPIRES_IN,
    refreshSecret: env.JWT_REFRESH_SECRET,
    refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
  },
  cloudinary: {
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    apiKey: env.CLOUDINARY_API_KEY,
    apiSecret: env.CLOUDINARY_API_SECRET,
    isConfigured: Boolean(
      env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET,
    ),
    /** Base folder per the engineering charter's asset-isolation convention. */
    folder: 'clients/sakib/react-blogify',
  },
} as const;
