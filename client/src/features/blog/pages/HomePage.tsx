import { useEffect, useRef } from 'react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import Skeleton from '@/components/ui/Skeleton';
import { getErrorMessage } from '@/lib/axios';
import { useAuth } from '@/features/auth/context/AuthContext';
import BlogList from '../components/BlogList';
import PopularBlogs from '../components/PopularBlogs';
import FavouriteBlogs from '../components/FavouriteBlogs';
import { useBlogs } from '../hooks/useBlogs';

export default function HomePage() {
  useDocumentTitle('Home');
  const { isAuthenticated } = useAuth();
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useBlogs();

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = loaderRef.current;
    if (!node || !hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) fetchNextPage();
      },
      { rootMargin: '200px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const blogs = data?.pages.flatMap((page) => page.blogs) ?? [];

  return (
    <main>
      <section>
        <div className="container min-h-[calc(100vh-90px)] pb-12">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
            {/* Feed */}
            <div className="space-y-3 md:col-span-5">
              {isError ? (
                <ErrorMessage message={getErrorMessage(error)} />
              ) : isLoading ? (
                <div className="grid gap-3">
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>
              ) : blogs.length === 0 ? (
                <EmptyState message="No blogs yet. Be the first to write one!" />
              ) : (
                <>
                  <BlogList blogs={blogs} />
                  {hasNextPage ? (
                    <div
                      ref={loaderRef}
                      className="text-xl italic text-center text-white"
                    >
                      {isFetchingNextPage ? 'Fetching blogs…' : ''}
                    </div>
                  ) : (
                    <p className="text-xl italic text-center text-white">
                      All blogs are fetched!
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="w-full h-full space-y-5 md:col-span-2">
              <PopularBlogs />
              {isAuthenticated && <FavouriteBlogs />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
