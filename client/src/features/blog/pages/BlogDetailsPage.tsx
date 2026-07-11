import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import Loader from '@/components/ui/Loader';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { getErrorMessage } from '@/lib/axios';
import BlogDetailsCard from '../components/BlogDetailsCard';
import BlogComments from '../components/BlogComments';
import BlogActions from '../components/BlogActions';
import { useBlog } from '../hooks/useBlog';

export default function BlogDetailsPage() {
  const { blogId } = useParams();
  const { data: blog, isLoading, isError, error } = useBlog(blogId);
  useDocumentTitle(blog?.title ?? 'Blog Details');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blogId]);

  if (isLoading) return <Loader />;
  if (isError || !blog) return <ErrorMessage message={getErrorMessage(error)} />;

  return (
    <>
      <main>
        <BlogDetailsCard blog={blog} />
        <BlogComments blog={blog} />
      </main>
      <BlogActions blog={blog} />
    </>
  );
}
