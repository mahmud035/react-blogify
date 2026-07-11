import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/lib/axios';
import { queryKeys } from '@/lib/queryKeys';
import type { Blog, Comment } from '@/types/entities';
import { addComment, deleteComment } from '../blog.api';

/** Writes the fresh comment list back into the cached blog detail. */
function patchComments(
  queryClient: ReturnType<typeof useQueryClient>,
  blogId: string,
  comments: Comment[],
) {
  queryClient.setQueryData<Blog>(
    queryKeys.blogs.detail(blogId),
    (prev) => (prev ? { ...prev, comments } : prev),
  );
}

export function useAddComment(blogId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => addComment(blogId, content),
    onSuccess: ({ comments }) => patchComments(queryClient, blogId, comments),
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useDeleteComment(blogId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => deleteComment(blogId, commentId),
    onSuccess: ({ comments }) => {
      patchComments(queryClient, blogId, comments);
      toast.success('Comment deleted');
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
