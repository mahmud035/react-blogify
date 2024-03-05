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
  const { loading, error } = profile || {};
  const { auth } = useAuth();
  const userId = localStorage.getItem('userId') || auth?.user?.id;

  //* Fetch Login User Info
  useEffect(() => {
    if (!userId) {
      return;
    }

    profileDispatch({ type: actions.profile.DATA_FETCHING });

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${userId}`
        );

        if (response.status === 200) {
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

    fetchProfile();
  }, [userId]);

  console.log('error=>', error);

  return (
    <div>
      {loading ? (
        <LargeLoader message="Fetching profile data..." />
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
