import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { getBlogs } from '../blog.api';

const PAGE_SIZE = 5;

/** Paginated home feed as an infinite query (newest first). */
export function useBlogs() {
  return useInfiniteQuery({
    queryKey: queryKeys.blogs.list(),
    queryFn: ({ pageParam }) => getBlogs(pageParam, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const loaded = lastPage.page * lastPage.limit;
      return loaded < lastPage.total ? lastPage.page + 1 : undefined;
    },
  });
}
