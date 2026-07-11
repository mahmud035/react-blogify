import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/lib/axios';
import { queryKeys } from '@/lib/queryKeys';
import type { Blog } from '@/types/entities';
import { toggleFavourite } from '../blog.api';

/** Toggles a blog in the user's favourites, patching the detail cache. */
export function useToggleFavourite(blogId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleFavourite(blogId),
    onSuccess: ({ isFavourite }) => {
      queryClient.setQueryData<Blog>(
        queryKeys.blogs.detail(blogId),
        (prev) => (prev ? { ...prev, isFavourite } : prev),
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs.favourites() });
      toast.success(isFavourite ? 'Added to favourites' : 'Removed from favourites');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
