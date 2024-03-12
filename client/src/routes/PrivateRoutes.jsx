import { Navigate, useLocation } from 'react-router-dom';
import LargeLoader from '../components/ui/LargeLoader';
import useAuth from '../hooks/auth/useAuth';
import useProfile from '../hooks/profile/useProfile';

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { loading } = useProfile();
  const { auth } = useAuth();

  const userId =
    JSON.parse(localStorage.getItem('authInfo'))?.userId || auth?.user?.id;
  const accessToken =
    JSON.parse(localStorage.getItem('authInfo'))?.accessToken ||
    auth?.accessToken;

  if (loading) {
    return <LargeLoader />;
  }

  return (
    <>
      {userId && accessToken ? (
        <>{children}</>
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default PrivateRoutes;
