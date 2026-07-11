import { api, unwrap } from '@/lib/axios';
import type { User, UserProfile } from '@/types/entities';

export function getProfile(userId: string) {
  return unwrap<UserProfile>(api.get(`/profile/${userId}`));
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  bio?: string;
}

export function updateProfile(payload: UpdateProfilePayload) {
  return unwrap<{ user: User }>(api.patch('/profile', payload));
}

export function uploadAvatar(file: File) {
  const formData = new FormData();
  formData.append('avatar', file);
  return unwrap<{ user: User }>(api.post('/profile/avatar', formData));
}
