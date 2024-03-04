import BlogCard from './BlogCard';

const BlogList = ({ blogs }) => {
  // TODO: blogs will be mapped here and handle case when no blogs data found

  return (
    <div className="grid gap-2">
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
};

export default BlogList;
