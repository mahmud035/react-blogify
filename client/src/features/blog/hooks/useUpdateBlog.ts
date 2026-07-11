import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/lib/axios';
import { queryKeys } from '@/lib/queryKeys';
import { updateBlog } from '../blog.api';

export function useUpdateBlog(blogId: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: FormData) => updateBlog(blogId, formData),
    onSuccess: ({ blog }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.blogs.detail(blogId),
      });
      toast.success('Blog updated');
      navigate(`/blogs/${blog.id}`);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
