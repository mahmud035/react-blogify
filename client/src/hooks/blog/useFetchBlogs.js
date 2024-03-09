import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { actions } from '../../actions';
import useBlog from './useBlog';

const blogPerPage = 10;

const useFetchBlogs = () => {
  const { blogState, blogDispatch } = useBlog();
  const { blogs, error } = blogState || {};
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const loaderRef = useRef(null);

  //* Fetch Blogs Data
  useEffect(() => {
    let ignore = false;
    blogDispatch({ type: actions.blog.DATA_FETCHING });

    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/blogs?page=${page}&limit=${blogPerPage}`
        );

        if (response.data?.blogs?.length === 0) {
          setHasMore(false);
          setShowMessage(true);
        } else if (response.data?.blogs?.length > 0 && !ignore) {
          blogDispatch({
            type: actions.blog.DATA_FETCHED,
            data: response.data.blogs,
          });
          setPage((prevPage) => prevPage + 1);
        }
      } catch (error) {
        console.log(error);
        blogDispatch({
          type: actions.blog.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };

    // Intersection Observer API For Infinity Scrolling
    const onIntersection = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        fetchBlogs();
      }
    };

    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      ignore = true;
      if (observer) observer.disconnect();
    };
  }, [hasMore, page]);

  //* Show Success Message
  useEffect(() => {
    let timeoutId;

    if (showMessage) {
      timeoutId = setTimeout(() => {
        setShowMessage(false);
      }, 1500);
    }

    return () => clearTimeout(timeoutId);
  }, [showMessage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return { blogs, error, hasMore, loaderRef, showMessage };
};

export default useFetchBlogs;
