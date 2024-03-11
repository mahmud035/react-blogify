import { toast } from 'react-toastify';
import { actions } from '../../actions';
import useAxios from '../auth/useAxios';
import useProfile from './useProfile';

const useProfileActions = () => {
  const { profileDispatch } = useProfile();
  const { api } = useAxios();

  //* Edit Bio
  const handleBioEdit = async (bio, setEditMode) => {
    if (bio?.length === 0) {
      return toast.warn('Please write something about yourself.');
    }

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
        setEditMode(false);
      }
    } catch (error) {
      profileDispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return { handleBioEdit };
};

export default useProfileActions;
