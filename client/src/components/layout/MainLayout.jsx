import axios from 'axios';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { actions } from '../../actions';
import useAuth from '../../hooks/auth/useAuth';
import useProfile from '../../hooks/profile/useProfile';
import Footer from '../../shared/Footer';
import Header from '../../shared/Header';
import LargeLoader from '../ui/LargeLoader';

const MainLayout = () => {
  const { profile, profileDispatch } = useProfile();
  const { loading } = profile || {};
  const { auth } = useAuth();

  const userId =
    JSON.parse(localStorage.getItem('authInfo'))?.userId || auth?.user?.id;

  const profileId =
    localStorage.getItem('profileId') || profile?.blogAuthor?.id;

  //* NOTE: Fetch / Re-fetch the logged-in user's information upon successful login and store it in the ProfileContext. Then, provide this user information across the application using the ProvideProvider. Additionally, ensure that the user information is re-fetched when the page is reloaded.

  useEffect(() => {
    if (userId) {
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

  //* Re-fetch the profile data of the currently viewed author when page reloads
  useEffect(() => {
    if (profileId) {
      let ignore = false;
      profileDispatch({ type: actions.profile.DATA_FETCHING });

      const fetchBlogAuthorProfile = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${profileId}`
          );

          if (response.status === 200 && !ignore) {
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
        }
      };
      fetchBlogAuthorProfile();

      // cleanup
      return () => {
        ignore = true;
      };
    }
  }, [profileId]);

  return (
    <div>
      <Header />

      {loading ? (
        <LargeLoader message="Loading" />
      ) : (
        <>
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
};

export default MainLayout;
