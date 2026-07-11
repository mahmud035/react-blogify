import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/lib/axios';
import { queryKeys } from '@/lib/queryKeys';
import type { Blog } from '@/types/entities';
import { toggleLike } from '../blog.api';

/** Toggles the current user's like on a blog, patching the detail cache. */
export function useToggleLike(blogId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLike(blogId),
    onSuccess: ({ isLiked, likes }) => {
      queryClient.setQueryData<Blog>(
        queryKeys.blogs.detail(blogId),
        (prev) => (prev ? { ...prev, isLiked, likes } : prev),
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs.popular() });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
