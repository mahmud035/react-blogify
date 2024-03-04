import { useEffect } from 'react';
import BlogActions from '../components/blogDetails/BlogActions';
import BlogComments from '../components/blogDetails/BlogComments';
import BlogDetailsCard from '../components/blogDetails/BlogDetailsCard';

const BlogDetailsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const comments = 'Comments will come from single blog data';

  return (
    <>
      <main>
        <BlogDetailsCard />
        <BlogComments comments={comments} />
      </main>

      <BlogActions />
    </>
  );
};

export default BlogDetailsPage;
