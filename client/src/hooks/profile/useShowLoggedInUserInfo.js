import { useParams } from 'react-router-dom';
import useGetUser from '../useGetUser';

const useShowLoggedInUserInfo = () => {
  const user = useGetUser();
  const { profileId } = useParams();

  const showLoggedInUserInfo = profileId === user?.id;

  return { showLoggedInUserInfo };
};

export default useShowLoggedInUserInfo;
