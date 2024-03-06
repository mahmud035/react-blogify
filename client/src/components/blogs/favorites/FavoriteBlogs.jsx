import { useEffect } from 'react';
import { actions } from '../../../actions';
import useAxios from '../../../hooks/useAxios';
import useBlog from '../../../hooks/useBlog';
import FavoriteBlogList from './FavoriteBlogList';

const FavoriteBlogs = () => {
  const { blogDispatch } = useBlog();
  const { api } = useAxios();

  //* Fetch Favorite Blogs
  useEffect(() => {
    let ignore = false;
    blogDispatch({ type: actions.blog.DATA_FETCHING });

    const fetchFavoriteBlogs = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`
        );

        if (response.status === 200 && !ignore) {
          blogDispatch({
            type: actions.blog.FAVORITE_BLOG_DATA_FETCHED,
            data: response.data.blogs,
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

    fetchFavoriteBlogs();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="sidebar-card">
      <h3 className="text-xl font-semibold text-slate-300 lg:text-2xl">
        Your Favourites ❤️
      </h3>

      <FavoriteBlogList />
    </div>
  );
};

export default FavoriteBlogs;
