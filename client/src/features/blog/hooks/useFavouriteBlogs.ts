import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { useAuth } from '@/features/auth/context/AuthContext';
import { getFavouriteBlogs } from '../blog.api';

/** The signed-in user's favourite blogs (sidebar). Skipped when logged out. */
export function useFavouriteBlogs() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.blogs.favourites(),
    queryFn: getFavouriteBlogs,
    enabled: isAuthenticated,
  });
}
