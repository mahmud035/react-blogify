import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { actions } from '../../actions';
import useBlog from './useBlog';

const useFetchSingleBlog = () => {
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
};

export default useFetchSingleBlog;
