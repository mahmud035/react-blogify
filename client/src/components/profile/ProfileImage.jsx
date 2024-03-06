import { useRef } from 'react';
import { actions } from '../../actions';
import editIcon from '../../assets/icons/edit.svg';
import useAxios from '../../hooks/useAxios';
import useGetUser from '../../hooks/useGetUser';
import useProfile from '../../hooks/useProfile';

const ProfileImage = () => {
  const user = useGetUser();
  const { api } = useAxios();
  const { profile, profileDispatch } = useProfile();
  const { blogAuthor } = profile || {};
  const fileUploadRef = useRef(null);

  // Show dummy avatar if avatar is not found
  let nameFirstChar;

  if (blogAuthor?.id === user?.id) {
    nameFirstChar = user?.firstName?.slice(0, 1)?.toUpperCase();
  } else {
    nameFirstChar = blogAuthor?.firstName?.slice(0, 1)?.toUpperCase();
  }

  const userAvatar =
    user?.avatar !== null
      ? `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${user?.avatar}`
      : `https://dummyimage.com/200x200/00D991/ffffff&text=${nameFirstChar}`;

  const authorAvatar =
    blogAuthor?.avatar !== null
      ? `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
          blogAuthor?.avatar
        }`
      : `https://dummyimage.com/200x200/00D991/ffffff&text=${nameFirstChar}`;

  const handleFileUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.addEventListener('change', updateUserAvatar);
    fileUploadRef.current.click();
  };

  const updateUserAvatar = async () => {
    try {
      const formData = new FormData();
      for (const file of fileUploadRef.current.files) {
        formData.append('avatar', file);
      }

      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/avatar`,
        formData
      );

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
        src={blogAuthor?.id === user?.id ? userAvatar : authorAvatar}
        alt="Profile Image"
      />

      {blogAuthor?.id === user?.id && (
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
