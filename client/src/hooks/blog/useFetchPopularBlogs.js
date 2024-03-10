import axios from 'axios';
import { useEffect } from 'react';
import { actions } from '../../actions';
import useBlog from './useBlog';

const useFetchPopularBlogs = () => {
  const { blogState, blogDispatch } = useBlog();
  const { popularBlogs } = blogState || {};

  //* Fetch Popular Blogs
  useEffect(() => {
    let ignore = false;
    blogDispatch({ type: actions.blog.DATA_FETCHING });

    const fetchPopularBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/popular`
        );

        if (response.status === 200 && !ignore) {
          blogDispatch({
            type: actions.blog.POPULAR_BLOG_DATA_FETCHED,
            data: response.data.blogs,
          });
        }
      } catch (error) {
        blogDispatch({
          type: actions.blog.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };

    fetchPopularBlogs();

    return () => {
      ignore = true;
    };
  }, []);

  return { popularBlogs };
};

export default useFetchPopularBlogs;
