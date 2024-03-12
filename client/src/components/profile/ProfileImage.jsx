import { useRef } from 'react';
import { actions } from '../../actions';
import editIcon from '../../assets/icons/edit.svg';
import useAxios from '../../hooks/auth/useAxios';
import useGetUser from '../../hooks/auth/useGetUser';
import useProfile from '../../hooks/profile/useProfile';
import useShowLoggedInUserInfo from '../../hooks/profile/useShowLoggedInUserInfo';
import { baseURL, getAuthorAvatar, getUserAvatar } from '../../utils';

const ProfileImage = () => {
  const user = useGetUser();
  const { api } = useAxios();
  const { showLoggedInUserInfo } = useShowLoggedInUserInfo();
  const { profile, profileDispatch } = useProfile();
  const { blogAuthor } = profile || {};
  const fileUploadRef = useRef(null);

  // Show dummy avatar if avatar is not found
  let nameFirstChar;

  if (showLoggedInUserInfo) {
    nameFirstChar = user?.firstName?.slice(0, 1)?.toUpperCase();
  } else {
    nameFirstChar = blogAuthor?.firstName?.slice(0, 1)?.toUpperCase();
  }

  const userAvatar = getUserAvatar(user?.avatar, nameFirstChar);
  const authorAvatar = getAuthorAvatar(blogAuthor?.avatar, nameFirstChar);

  const handleFileUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.addEventListener('change', updateUserAvatar);
    fileUploadRef.current.click();
  };

  //* Update User Avatar
  const updateUserAvatar = async () => {
    try {
      const formData = new FormData();
      for (const file of fileUploadRef.current.files) {
        formData.append('avatar', file);
      }

      const response = await api.post(`${baseURL}/profile/avatar`, formData);

      if (response.status === 200) {
        profileDispatch({
          type: actions.profile.IMAGE_UPDATED,
          data: response.data.user,
        });
      }
    } catch (error) {
      profileDispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img
        className="max-w-full rounded-full"
        src={showLoggedInUserInfo ? userAvatar : authorAvatar}
        alt="Profile Image"
      />

      {showLoggedInUserInfo && (
        <form action="">
          <button
            onClick={handleFileUpload}
            className="absolute bottom-0 right-0 grid rounded-full place-items-center h-7 w-7 bg-slate-700 hover:bg-slate-700/80"
          >
            <img src={editIcon} alt="Edit" />
          </button>
          <input
            type="file"
            id="file"
            accept="image/*"
            ref={fileUploadRef}
            className="hidden"
          />
        </form>
      )}
    </div>
  );
};

export default ProfileImage;
