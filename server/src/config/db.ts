import mongoose from 'mongoose';
import { config } from './index';

/**
 * Serverless-safe Mongoose connection.
 *
 * On Vercel each invocation may reuse a warm container, so we cache the
 * connection promise on `globalThis` to avoid opening a new pool per request
 * (which quickly exhausts Atlas connection limits).
 */
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as unknown as {
  _mongooseCache?: MongooseCache;
};

const cache: MongooseCache =
  globalForMongoose._mongooseCache ?? { conn: null, promise: null };

globalForMongoose._mongooseCache = cache;

export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    mongoose.set('strictQuery', true);
    cache.promise = mongoose.connect(config.mongoUri, {
      // Keep the pool small; serverless containers are single-request.
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
