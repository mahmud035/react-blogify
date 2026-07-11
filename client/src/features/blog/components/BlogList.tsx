import type { Blog } from '@/types/entities';
import EmptyState from '@/components/ui/EmptyState';
import BlogCard from './BlogCard';

interface BlogListProps {
  blogs: Blog[];
  keyword?: string;
  emptyMessage?: string;
}

export default function BlogList({
  blogs,
  keyword = '',
  emptyMessage = 'No blogs found!',
}: BlogListProps) {
  if (blogs.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="grid gap-3">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} keyword={keyword} />
      ))}
    </div>
  );
}
