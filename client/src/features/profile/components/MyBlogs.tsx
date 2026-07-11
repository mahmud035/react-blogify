import type { Blog } from '@/types/entities';
import BlogList from '@/features/blog/components/BlogList';

interface MyBlogsProps {
  blogs: Blog[];
  heading: string;
  emptyMessage: string;
}

export default function MyBlogs({ blogs, heading, emptyMessage }: MyBlogsProps) {
  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">{heading}</h4>
      <div className="my-6 space-y-4">
        <BlogList blogs={blogs} emptyMessage={emptyMessage} />
      </div>
    </>
  );
}
