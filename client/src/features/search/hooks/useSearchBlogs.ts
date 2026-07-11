import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { useDebounce } from '@/hooks/useDebounce';
import { searchBlogs } from '../search.api';

/** Debounced title search. Skips empty queries; keeps prior results while typing. */
export function useSearchBlogs(keyword: string) {
  const term = useDebounce(keyword.trim(), 400);

  const query = useQuery({
    queryKey: queryKeys.search.query(term),
    queryFn: () => searchBlogs(term),
    enabled: term.length > 0,
    placeholderData: keepPreviousData,
  });

  return { ...query, term };
}
