import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/auth/useAuth';
import useBlog from '../../hooks/blog/useBlog';
import useFetchBlogAuthorProfile from '../../hooks/profile/useFetchBlogAuthorData';
import useFetchUserProfile from '../../hooks/profile/useFetchUserProfile';
import useProfile from '../../hooks/profile/useProfile';
import Footer from '../../shared/Footer';
import Header from '../../shared/Header';
import Error from '../ui/Error';

const MainLayout = () => {
  const { fetchBlogAuthorProfile } = useFetchBlogAuthorProfile();
  const { auth } = useAuth();
  const { profile } = useProfile();
  const { blogState } = useBlog();
  const { error: profileError } = profile || {};
  const { error: blogError } = blogState || {};

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

  if (profileError || blogError) {
    content = <Error error={profileError || blogError} />;
  } else {
    content = (
      <>
        <Outlet />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      {content}
    </>
  );
};

export default MainLayout;
