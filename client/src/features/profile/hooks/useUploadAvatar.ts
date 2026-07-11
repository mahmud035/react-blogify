import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/lib/axios';
import { queryKeys } from '@/lib/queryKeys';
import { useAuth } from '@/features/auth/context/AuthContext';
import { uploadAvatar } from '../profile.api';

export function useUploadAvatar(userId: string) {
  const queryClient = useQueryClient();
  const { user, setUser } = useAuth();

  return useMutation({
    mutationFn: uploadAvatar,
    onSuccess: ({ user: updated }) => {
      if (user?.id === updated.id) setUser({ ...user, ...updated });
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile.detail(userId),
      });
      toast.success('Avatar updated');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
