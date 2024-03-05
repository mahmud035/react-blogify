import useAuth from './useAuth';
import useProfile from './useProfile';

const useGetUser = () => {
  const { auth } = useAuth();
  const { profile } = useProfile();

  //* Decide where to get the user
  const user = profile?.user ?? auth?.user;

  return user;
};

export default useGetUser;
