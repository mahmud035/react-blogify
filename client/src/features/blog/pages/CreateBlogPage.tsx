import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import BlogForm from '../components/BlogForm';
import { useCreateBlog } from '../hooks/useCreateBlog';

export default function CreateBlogPage() {
  useDocumentTitle('Create Blog');
  const { mutate: create, isPending } = useCreateBlog();

  return (
    <main>
      <section>
        <div className="container min-h-[calc(100vh-90px)]">
          <BlogForm
            mode="create"
            isPending={isPending}
            submitLabel="Create Blog"
            onSubmit={(formData) => create(formData)}
          />
        </div>
      </section>
    </main>
  );
}
