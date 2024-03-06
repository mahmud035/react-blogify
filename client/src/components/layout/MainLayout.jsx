import axios from 'axios';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { actions } from '../../actions';
import useAuth from '../../hooks/useAuth';
import useProfile from '../../hooks/useProfile';
import Footer from '../../shared/Footer';
import Header from '../../shared/Header';
import LargeLoader from '../ui/LargeLoader';

const MainLayout = () => {
  const { profile, profileDispatch } = useProfile();
  const { loading } = profile || {};
  const { auth } = useAuth();

  // get userId from localStorage
  const userId =
    JSON.parse(localStorage.getItem('authInfo'))?.userId || auth?.user?.id;

  //* NOTE: Fetch login user information when user successfully loggedIn and set that information into ProfileContext, finally provide the userInformation across the Application using ProvideProvider. Also re-fetching the userInformation when page reloads.

  useEffect(() => {
    if (!userId) {
      return;
    }

    let ignore = false;
    profileDispatch({ type: actions.profile.DATA_FETCHING });

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${userId}`
        );

        if (response.status === 200 && !ignore) {
          profileDispatch({
            type: actions.profile.DATA_FETCHED,
            data: response.data,
          });
          // profileDispatch({})
        }
      } catch (error) {
        console.log(error);
        profileDispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error?.response?.data?.error,
        });
      }
    };

    fetchProfile();

    // cleanup
    return () => {
      ignore = true;
    };
  }, [userId]);

  return (
    <div>
      {loading ? (
        <LargeLoader message="Loading" />
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
};

export default MainLayout;
