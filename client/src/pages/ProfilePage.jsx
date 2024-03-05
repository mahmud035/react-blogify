import axios from 'axios';
import { useEffect } from 'react';
import { actions } from '../actions';
import MyBlogs from '../components/profile/MyBlogs';
import ProfileInfo from '../components/profile/ProfileInfo';
import Error from '../components/ui/Error';
import Loading from '../components/ui/Loading';
import useAuth from '../hooks/useAuth';
import useProfile from '../hooks/useProfile';

const ProfilePage = () => {
  const { profile, profileDispatch } = useProfile();
  const { loading, error } = profile || {};
  const { auth } = useAuth();
  const userId = auth?.user?.id || localStorage.getItem('userId');

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
        profileDispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };

    fetchProfile();
  }, [userId]);

  //* Decide what to render on UI
  if (loading) return <Loading message="Fetching profile data..." />;
  if (error) return <Error error={error} />;

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        <ProfileInfo />
        <MyBlogs />
      </div>
    </main>
  );
};

export default ProfilePage;
