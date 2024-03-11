import axios from 'axios';
import { useEffect } from 'react';
import { actions } from '../../actions';
import useProfile from './useProfile';

// NOTE: Fetch / Re-fetch the logged-in user's information upon successful login and store it in the ProfileContext. Then, provide this user information across the application using the ProvideProvider. Additionally, ensure that the user information is re-fetched when the page is reloaded.

const useFetchUserProfile = (userId) => {
  const { profileDispatch } = useProfile();

  //* Fetch User Profile
  useEffect(() => {
    if (userId) {
      console.log('fetching user profile info...');

      let ignore = false;
      profileDispatch({ type: actions.profile.DATA_FETCHING });

      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${userId}`
          );

          if (response.status === 200 && !ignore) {
            profileDispatch({
              type: actions.profile.DATA_FETCHED,
              data: response.data,
            });
          }
        } catch (error) {
          console.log(error);
          profileDispatch({
            type: actions.profile.DATA_FETCH_ERROR,
            error: error?.response?.data?.error,
          });
        }
      };
      fetchUserProfile();

      // cleanup
      return () => {
        ignore = true;
      };
    }
  }, [userId]);
};

export default useFetchUserProfile;
