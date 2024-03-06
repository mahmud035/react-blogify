import useShowLoggedInUserInfo from '../../hooks/profile/useShowLoggedInUserInfo';
import useProfile from '../../hooks/useProfile';
import Bio from './Bio';
import ProfileImage from './ProfileImage';

const ProfileInfo = () => {
  const { showLoggedInUserInfo } = useShowLoggedInUserInfo();
  const { profile } = useProfile();
  const { blogAuthor } = profile || {};

  return (
    <div className="flex flex-col items-center py-8 text-center">
      <ProfileImage />

      {/* name , email  */}
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          {showLoggedInUserInfo
            ? profile?.user?.firstName
            : blogAuthor?.firstName}{' '}
          {showLoggedInUserInfo
            ? profile?.user?.lastName
            : blogAuthor?.lastName}
        </h3>
        <p className="leading-[231%] lg:text-lg">
          {showLoggedInUserInfo ? profile?.user?.email : blogAuthor?.email}
        </p>
      </div>

      <Bio />
    </div>
  );
};

export default ProfileInfo;
