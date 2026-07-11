import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/lib/axios';
import { queryKeys } from '@/lib/queryKeys';
import { createBlog } from '../blog.api';

export function useCreateBlog() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createBlog,
    onSuccess: ({ blog }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all });
      toast.success('Blog created successfully');
      navigate(`/blogs/${blog.id}`);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
