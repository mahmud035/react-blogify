import { useEffect, useState } from 'react';
import checkIcon from '../../assets/icons/check.svg';
import editIcon from '../../assets/icons/edit.svg';
import useGetUser from '../../hooks/auth/useGetUser';
import useProfile from '../../hooks/profile/useProfile';
import useProfileActions from '../../hooks/profile/useProfileActions';
import useShowLoggedInUserInfo from '../../hooks/profile/useShowLoggedInUserInfo';

const Bio = () => {
  const [editMode, setEditMode] = useState(false);
  const { profile } = useProfile();
  const user = useGetUser();
  const { showLoggedInUserInfo } = useShowLoggedInUserInfo();
  const [bio, setBio] = useState(
    showLoggedInUserInfo ? profile?.user?.bio : profile?.blogAuthor?.bio
  );
  const { handleBioEdit } = useProfileActions();

  useEffect(() => {
    if (showLoggedInUserInfo) {
      setBio(user?.bio);
    } else {
      setBio(profile?.blogAuthor?.bio);
    }
  }, [showLoggedInUserInfo, user?.bio, profile?.blogAuthor?.bio]);

  return (
    <>
      <div className="flex items-start gap-2 mt-4 lg:mt-6">
        <div className="flex-1">
          {!editMode ? (
            <p className="leading-[188%] text-gray-400 lg:text-lg">
              {bio?.length ? bio : 'No Bio Information Found!'}
            </p>
          ) : (
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
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
              onClick={() => handleBioEdit(bio)}
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
