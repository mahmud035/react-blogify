import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { actions } from '../actions';
import BlogActions from '../components/blogDetails/BlogActions';
import BlogComments from '../components/blogDetails/BlogComments';
import BlogDetailsCard from '../components/blogDetails/BlogDetailsCard';
import useBlog from '../hooks/useBlog';

const BlogDetailsPage = () => {
  const { blogDispatch } = useBlog();
  const { blogId } = useParams();

  //* Fetch Single Blog Data
  useEffect(() => {
    let ignore = false;
    blogDispatch({ type: actions.blog.DATA_FETCHING });

    const fetchSingleBlog = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`
        );

        if (response.status === 200 && !ignore) {
          blogDispatch({
            type: actions.blog.SINGLE_BLOG_DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.log(error);
        blogDispatch({
          type: actions.blog.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };

    fetchSingleBlog();

    return () => {
      ignore = true;
    };
  }, [blogId]);

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
