import { useEffect } from 'react';
import BlogActions from '../components/blogDetails/BlogActions';
import BlogComments from '../components/blogDetails/BlogComments';
import BlogDetailsCard from '../components/blogDetails/BlogDetailsCard';
import useFetchSingleBlog from '../hooks/blog/useFetchSingleBlog';

const BlogDetailsPage = () => {
  //* Fetch Single Blog Data
  useFetchSingleBlog();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main>
        <BlogDetailsCard />
        <BlogComments />
      </main>

      <BlogActions />
    </>
  );
};

export default BlogDetailsPage;
