import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { actions } from '../actions';
import useProfile from './useProfile';

const useFetchBlogAuthorData = () => {
  const { profileDispatch } = useProfile();
  const navigate = useNavigate();

  const fetchBlogAuthorData = async (profileId) => {
    localStorage.setItem('profileId', profileId);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${profileId}`
      );

      if (response.status === 200) {
        profileDispatch({
          type: actions.profile.BLOG_AUTHOR_DATA_FETCHED,
          data: response.data,
        });
      }
    } catch (error) {
      console.log(error);
      profileDispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    } finally {
      navigate(`/profile/${profileId}`);
    }
  };

  return { fetchBlogAuthorData };
};

export default useFetchBlogAuthorData;
