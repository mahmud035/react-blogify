import Bio from './Bio';
import ProfileImage from './ProfileImage';

const ProfileInfo = () => {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <ProfileImage />

      {/* name , email  */}
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          Saad Hasan
        </h3>
        <p className="leading-[231%] lg:text-lg">saadhasan@gmail.com</p>
      </div>

      <Bio />
    </div>
  );
};

export default ProfileInfo;
