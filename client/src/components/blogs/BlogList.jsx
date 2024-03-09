import { useLocation } from 'react-router-dom';
import BlogCard from './BlogCard';

const BlogList = ({ blogs, keyword = '' }) => {
  const location = useLocation();
  const sortBlogs = location.pathname !== '/';

  // NOTE: Sort Blogs Only For Profile Page.
  return (
    <div className="grid gap-2">
      {blogs?.length > 0 ? (
        sortBlogs ? (
          blogs
            ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
            ?.map((blog) => <BlogCard key={blog?.id} blog={blog} />)
        ) : (
          blogs?.map((blog) => <BlogCard key={blog?.id} blog={blog} />)
        )
      ) : (
        <div className="py-8 text-2xl italic text-center">
          {keyword?.length > 0 ? (
            <p>
              No Blog Found For Title:{' '}
              <span className="text-[#00d991]">{`'${keyword}'`}</span>
            </p>
          ) : (
            <p>No Blog Data Found!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogList;
