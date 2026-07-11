import { api, unwrap } from '@/lib/axios';
import type { Blog } from '@/types/entities';

export interface SearchResult {
  count: number;
  query: string;
  results: Blog[];
}

export function searchBlogs(query: string) {
  return unwrap<SearchResult>(
    api.get('/search', { params: { q: query } }),
  );
}
