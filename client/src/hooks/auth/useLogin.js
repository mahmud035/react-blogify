import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { baseURL } from '../../utils';
import useAuth from './useAuth';

const useLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (formData, setError) => {
    //* API call will return (accessToken, refreshToken and Logged in User Information)
    try {
      const response = await axios.post(`${baseURL}/auth/login`, formData);

      if (response.status === 200) {
        const { user, token } = response.data;

        if (token) {
          const accessToken = token.accessToken;
          const refreshToken = token.refreshToken;

          // set refreshToken, accessToken and userId into localStorage (for persisting the userInfo)
          localStorage.setItem('refreshToken', refreshToken);
          const authInfo = { accessToken, userId: user.id };
          localStorage.setItem('authInfo', JSON.stringify(authInfo));

          // set authInfo into AuthContext (for in-memory auth management)
          setAuth({ user, accessToken, refreshToken });
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      setError('root.random', {
        type: 'random',
        message: `${error?.response?.data?.error}`,
      });
    }
  };

  return { handleLogin };
};

export default useLogin;
