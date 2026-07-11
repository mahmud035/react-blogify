import { api, unwrap } from '@/lib/axios';
import type { User } from '@/types/entities';
import type { LoginValues, RegisterValues } from './auth.schema';

export function login(payload: LoginValues) {
  return unwrap<{ user: User }>(api.post('/auth/login', payload));
}

export function register(payload: RegisterValues) {
  return unwrap<{ user: User }>(api.post('/auth/register', payload));
}

export function logout() {
  return api.post('/auth/logout');
}
