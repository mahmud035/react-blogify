import { toast } from 'react-toastify';
import { actions } from '../../actions';
import useAxios from '../auth/useAxios';
import useGetUser from '../auth/useGetUser';
import useProfile from '../profile/useProfile';
import useBlog from './useBlog';

const useBlogActions = () => {
  const { profileDispatch } = useProfile();
  const { api } = useAxios();
  const user = useGetUser();
  const { blogDispatch } = useBlog();

  //* Toggle Favorite
  const handleToggleFavorite = async (blogId) => {
    if (!user) return toast.error(`Please login to add the blog to favorites.`);

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/favourite`
      );

      if (response.status === 200) {
        profileDispatch({
          type: actions.profile.TOGGLE_FAVORITE,
          data: response.data,
        });
      }
    } catch (error) {
      profileDispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  //* Toggle Like
  const handleToggleLike = async (blogId) => {
    if (!user) return toast.error(`Please login to like the blog.`);

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/like`
      );

      if (response.status === 200) {
        blogDispatch({
          type: actions.blog.TOGGLE_LIKE,
          data: response.data.likes,
        });
      }
    } catch (error) {
      blogDispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return { handleToggleFavorite, handleToggleLike };
};

export default useBlogActions;
