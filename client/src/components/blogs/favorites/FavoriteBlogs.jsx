import { useEffect } from 'react';
import { actions } from '../../../actions';
import useAxios from '../../../hooks/auth/useAxios';
import useProfile from '../../../hooks/profile/useProfile';
import FavoriteBlogList from './FavoriteBlogList';

const FavoriteBlogs = () => {
  const { profileDispatch } = useProfile();
  const { api } = useAxios();

  const userId = JSON.parse(localStorage.getItem('authInfo'))?.userId;

  //* Fetch Favorite Blogs
  useEffect(() => {
    if (userId) {
      let ignore = false;

      const fetchFavoriteBlogs = async () => {
        try {
          const response = await api.get(
            `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`
          );

          if (response.status === 200 && !ignore) {
            profileDispatch({
              type: actions.profile.FAVORITE_BLOG_DATA_FETCHED,
              data: response.data.blogs,
            });
          }
        } catch (error) {
          profileDispatch({
            type: actions.profile.DATA_FETCH_ERROR,
            error: error.message,
          });
        }
      };
      fetchFavoriteBlogs();

      return () => {
        ignore = true;
      };
    }
  }, [userId]);

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
