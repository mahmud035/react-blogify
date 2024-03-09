import useProfile from '../profile/useProfile';
import useAuth from './useAuth';

const useGetUser = () => {
  const { auth } = useAuth();
  const { profile } = useProfile();

  //* get loggedIn user from profileContext or AuthContext
  const user = profile?.user ?? auth?.user;

  return user;
};

export default useGetUser;
