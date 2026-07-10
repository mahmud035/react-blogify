/** Central query-key factory for TanStack Query cache management. */
export const queryKeys = {
  blogs: {
    all: ['blogs'] as const,
    list: () => [...queryKeys.blogs.all, 'list'] as const,
    popular: () => [...queryKeys.blogs.all, 'popular'] as const,
    favourites: () => [...queryKeys.blogs.all, 'favourites'] as const,
    detail: (id: string) => [...queryKeys.blogs.all, 'detail', id] as const,
  },
  profile: {
    all: ['profile'] as const,
    detail: (id: string) => [...queryKeys.profile.all, id] as const,
  },
  search: {
    all: ['search'] as const,
    query: (q: string) => [...queryKeys.search.all, q] as const,
  },
} as const;
