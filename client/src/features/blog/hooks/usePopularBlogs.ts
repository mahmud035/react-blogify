import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { getPopularBlogs } from '../blog.api';

/** Top blogs by like count (sidebar). */
export function usePopularBlogs() {
  return useQuery({
    queryKey: queryKeys.blogs.popular(),
    queryFn: () => getPopularBlogs(),
  });
}
