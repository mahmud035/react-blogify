import axios from 'axios';
import { useEffect } from 'react';
import { api } from '../api';
import useAuth from './useAuth';

const useAxios = () => {
  const { auth, setAuth, setIsLoggedIn } = useAuth();

  useEffect(() => {
    //* Add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        //! where should I take accessToken? auth.accessToken or localStorage?
        const accessToken = localStorage.getItem('accessToken');

        console.log('accessToken from localStorage =>', accessToken);

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    //* Add a response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // IMPORTANT: If the error status is 401 and there is no originalRequest._retry flag, it means the token has expired and we need to refresh it.
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // const refreshToken = auth?.refreshToken;
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
            { refreshToken }
          );

          if (response.status === 200) {
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setIsLoggedIn(true); // is this line necessary?
            setAuth({ ...auth, accessToken, refreshToken });

            console.log(`New accessToken: ${accessToken}`);

            // Retry the original request with the new accessToken
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    // cleanup
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth?.accessToken]);

  return { api };
};

export default useAxios;
