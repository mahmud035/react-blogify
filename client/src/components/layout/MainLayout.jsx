import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/auth/useAuth';
import useFetchBlogAuthorProfile from '../../hooks/profile/useFetchBlogAuthorData';
import useFetchUserProfile from '../../hooks/profile/useFetchUserProfile';
import useProfile from '../../hooks/profile/useProfile';
import Footer from '../../shared/Footer';
import Header from '../../shared/Header';
import Error from '../ui/Error';
import LargeLoader from '../ui/LargeLoader';

const MainLayout = () => {
  const { profile } = useProfile();
  const { loading, error } = profile || {};
  const { auth } = useAuth();
  const { fetchBlogAuthorProfile } = useFetchBlogAuthorProfile();

  const userId =
    JSON.parse(localStorage.getItem('authInfo'))?.userId || auth?.user?.id;

  const profileId =
    localStorage.getItem('profileId') || profile?.blogAuthor?.id;

  //* Fetch / Re-fetch User Profile
  useFetchUserProfile(userId);

  //* On page reload, re-fetch currently viewed author's profile information
  useEffect(() => {
    fetchBlogAuthorProfile(profileId, false);
  }, [profileId]);

  //* Decide what to render on UI
  let content;

  if (loading) {
    content = <LargeLoader />;
  } else if (!loading && error) {
    content = <Error error={error} />;
  } else if (!loading && !error) {
    content = (
      <>
        <Outlet />
        <Footer />
      </>
    );
  }

  return (
    <div>
      <Header />
      {content}
    </div>
  );
};

export default MainLayout;
