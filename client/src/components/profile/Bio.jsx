import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { actions } from '../../actions';
import checkIcon from '../../assets/icons/check.svg';
import editIcon from '../../assets/icons/edit.svg';
import useShowLoggedInUserInfo from '../../hooks/profile/useShowLoggedInUserInfo';
import useAxios from '../../hooks/useAxios';
import useGetUser from '../../hooks/useGetUser';
import useProfile from '../../hooks/useProfile';

const Bio = () => {
  const { profile, profileDispatch } = useProfile();
  const { api } = useAxios();
  const user = useGetUser();
  const { showLoggedInUserInfo } = useShowLoggedInUserInfo();
  const [bio, setBio] = useState(
    showLoggedInUserInfo ? profile?.user?.bio : profile?.blogAuthor?.bio
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (showLoggedInUserInfo) {
      setBio(user?.bio);
    }
  }, [showLoggedInUserInfo, user?.bio]);

  //* Edit Bio
  const handleBioEdit = async () => {
    if (bio?.length === 0) {
      return toast.warn('Please write something about yourself.');
    }

    profileDispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile`,
        { bio }
      );

      if (response.status === 200) {
        profileDispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data?.user?.bio,
        });
        toast.success('Profile Updated Successfully!');
      }
    } catch (error) {
      profileDispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <>
      <div className="flex items-start gap-2 mt-4 lg:mt-6">
        <div className="flex-1">
          {!editMode ? (
            <p className="leading-[188%] text-gray-400 lg:text-lg">
              {bio?.length
                ? showLoggedInUserInfo
                  ? user?.bio
                  : profile?.blogAuthor?.bio
                : 'No Bio Information Found!'}
            </p>
          ) : (
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              // value={
              //   showLoggedInUserInfo ? user?.bio : profile?.blogAuthor?.bio
              // }
              className={`p-2 leading-[188%] text-gray-400 lg:text-lg rounded ${
                bio?.length === 0 && 'outline outline-red-500 outline-offset-0'
              }`}
              cols="55"
              rows="4"
            />
          )}
        </div>

        {/* Edit Bio button. The Above bio will be editable when clicking on the button  */}
        {showLoggedInUserInfo ? (
          !editMode ? (
            <button
              onClick={() => {
                setBio(user?.bio);
                setEditMode(true);
              }}
              className="rounded-full flex-center h-7 w-7"
            >
              <img src={editIcon} alt="Edit" />
            </button>
          ) : (
            <button
              onClick={handleBioEdit}
              className="rounded-full flex-center h-7 w-7"
            >
              <img src={checkIcon} alt="Check" />
            </button>
          )
        ) : null}
      </div>
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </>
  );
};

export default Bio;
