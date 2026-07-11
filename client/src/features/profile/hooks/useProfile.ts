import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { getProfile } from '../profile.api';

export function useProfile(userId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.profile.detail(userId ?? ''),
    queryFn: () => getProfile(userId as string),
    enabled: Boolean(userId),
  });
}
