import { Navigate, useLocation } from 'react-router-dom';
import LargeLoader from '../components/ui/LargeLoader';
import useProfile from '../hooks/useProfile';

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { loading } = useProfile();
  const userId = localStorage.getItem('userId');
  const accessToken = localStorage.getItem('accessToken');

  if (loading) {
    return <LargeLoader message="Loading" />;
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
