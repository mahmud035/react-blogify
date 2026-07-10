import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';
import type { ApiErrorBody } from '@/types/api';

/** Shared axios instance. Cookies (HTTP-only JWTs) travel automatically. */
export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

// Endpoints that must never trigger the refresh-retry loop.
const AUTH_FREE = [
  '/auth/login',
  '/auth/register',
  '/auth/refresh-token',
  '/auth/logout',
];

// De-dupe concurrent refreshes so a burst of 401s triggers a single refresh.
let refreshPromise: Promise<unknown> | null = null;

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as RetriableConfig | undefined;
    const status = error.response?.status;
    const url = original?.url ?? '';

    const shouldRefresh =
      status === 401 &&
      original &&
      !original._retry &&
      !AUTH_FREE.some((p) => url.includes(p));

    if (shouldRefresh) {
      original._retry = true;
      try {
        refreshPromise ??= api.post('/auth/refresh-token');
        await refreshPromise;
        return api(original);
      } catch {
        // Refresh failed — fall through as an unauthenticated error.
      } finally {
        refreshPromise = null;
      }
    }

    return Promise.reject(error);
  },
);

/** Extracts a human-readable message from an API/axios error. */
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const body = error.response?.data as ApiErrorBody | undefined;
    if (body?.errorSources?.length) return body.errorSources[0].message;
    if (body?.message) return body.message;
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return 'Something went wrong';
}

/** Unwraps the API envelope, returning the inner `data`. */
export async function unwrap<T>(
  promise: Promise<{ data: { data: T } }>,
): Promise<T> {
  const res = await promise;
  return res.data.data;
}
