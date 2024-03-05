import editIcon from '../../assets/icons/edit.svg';
import useGetUser from '../../hooks/useGetUser';

const ProfileImage = () => {
  const user = useGetUser();

  // Show dummy avatar if user's avatar is not found
  const userNameFirstChar = user?.firstName?.slice(0, 1)?.toUpperCase();
  const userAvatar =
    user?.avatar !== null
      ? `${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`
      : userNameFirstChar;

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <div className="grid w-full h-full text-5xl text-white bg-orange-600 rounded-full place-items-center">
        <span className="">{userAvatar}</span>
      </div>

      <button className="absolute bottom-0 right-0 grid rounded-full place-items-center h-7 w-7 bg-slate-700 hover:bg-slate-700/80">
        <img src={editIcon} alt="Edit" />
      </button>
    </div>
  );
};

export default ProfileImage;
