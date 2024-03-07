import BlogCard from './BlogCard';

const BlogList = ({ blogs }) => {
  return (
    <div className="grid gap-2">
      {blogs?.length > 0 ? (
        blogs
          ?.sort((a, b) => new Date(b?.createAt) - new Date(a?.createAt))
          ?.map((blog) => <BlogCard key={blog?.id} blog={blog} />)
      ) : (
        <p className="pt-4 text-2xl text-center">No Blog Data Found!</p>
      )}
    </div>
  );
};

export default BlogList;
