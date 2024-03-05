import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

const PrivateRoutes = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return (
    <>
      {isLoggedIn ? (
        <>{children}</>
      ) : (
        <div>
          {toast.info('Please log in to your account.')}
          <Navigate to="/login" state={{ from: location }} replace />
        </div>
      )}
    </>
  );
};

export default PrivateRoutes;
