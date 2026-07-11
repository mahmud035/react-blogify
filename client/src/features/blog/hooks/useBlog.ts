import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { getBlog } from '../blog.api';

/** Single blog with full content (+ isLiked/isFavourite when authed). */
export function useBlog(blogId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.blogs.detail(blogId ?? ''),
    queryFn: () => getBlog(blogId as string),
    enabled: Boolean(blogId),
  });
}
