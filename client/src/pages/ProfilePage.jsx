import { useEffect } from 'react';
import MyBlogs from '../components/profile/MyBlogs';
import ProfileInfo from '../components/profile/ProfileInfo';

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container min-h-[calc(100vh-90px)]">
        <ProfileInfo />
        <MyBlogs />
      </div>
    </main>
  );
};

export default ProfilePage;
