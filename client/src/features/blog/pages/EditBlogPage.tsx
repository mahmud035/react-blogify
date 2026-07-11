import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import Loader from '@/components/ui/Loader';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { getErrorMessage } from '@/lib/axios';
import { useAuth } from '@/features/auth/context/AuthContext';
import BlogForm from '../components/BlogForm';
import { useBlog } from '../hooks/useBlog';
import { useUpdateBlog } from '../hooks/useUpdateBlog';

export default function EditBlogPage() {
  useDocumentTitle('Edit Blog');
  const { blogId } = useParams();
  const { user } = useAuth();
  const { data: blog, isLoading, isError, error } = useBlog(blogId);
  const { mutate: update, isPending } = useUpdateBlog(blogId as string);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <Loader />;
  if (isError || !blog) return <ErrorMessage message={getErrorMessage(error)} />;

  // Only the author may edit; bounce everyone else to the blog.
  if (user?.id !== blog.author.id) {
    return <Navigate to={`/blogs/${blog.id}`} replace />;
  }

  return (
    <main>
      <section>
        <div className="container min-h-[calc(100vh-90px)]">
          <BlogForm
            mode="edit"
            defaultValues={{
              title: blog.title,
              tags: blog.tags.join(', '),
              content: blog.content,
            }}
            existingThumbnail={blog.thumbnail}
            isPending={isPending}
            submitLabel="Save Changes"
            onSubmit={(formData) => update(formData)}
          />
        </div>
      </section>
    </main>
  );
}
