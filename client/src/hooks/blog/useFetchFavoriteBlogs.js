import { useEffect } from 'react';
import { actions } from '../../actions';
import useAxios from '../auth/useAxios';
import useProfile from '../profile/useProfile';

const useFetchFavoriteBlogs = (userId) => {
  const { profileDispatch } = useProfile();
  const { api } = useAxios();

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
};

export default useFetchFavoriteBlogs;
