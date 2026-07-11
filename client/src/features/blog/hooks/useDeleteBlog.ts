import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/lib/axios';
import { queryKeys } from '@/lib/queryKeys';
import { deleteBlog } from '../blog.api';

/** Deletes a blog. Callers pass an optional onSuccess for navigation. */
export function useDeleteBlog(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all });
      toast.success('Blog deleted');
      onSuccess?.();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
