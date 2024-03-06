import axios from 'axios';
import { useEffect } from 'react';
import { actions } from '../../actions';
import useBlog from '../../hooks/useBlog';
import PopularBlogList from './PopularBlogList';

const PopularBlogs = () => {
  const { blogState, blogDispatch } = useBlog();
  const { popularBlogs } = blogState || {};

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

  return (
    <div className="sidebar-card">
      <h3 className="text-xl font-semibold text-slate-300 lg:text-2xl">
        Most Popular 👍️
      </h3>

      <ul className="my-5 space-y-5">
        <PopularBlogList popularBlogs={popularBlogs} />
      </ul>
    </div>
  );
};

export default PopularBlogs;
