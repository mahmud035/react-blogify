import MyBlogs from '../components/profile/MyBlogs';
import ProfileInfo from '../components/profile/ProfileInfo';

const ProfilePage = () => {
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
