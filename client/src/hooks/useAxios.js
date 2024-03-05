import axios from 'axios';
import { useEffect } from 'react';
import { api } from '../api';
import useAuth from './useAuth';

const useAxios = () => {
  const { auth, setAuth, setIsLoggedIn } = useAuth();

  const accessToken = localStorage.getItem('accessToken') || auth?.accessToken;

  useEffect(() => {
    //* Add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
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

        // IMPORTANT: If the error status is 403 and there is no originalRequest._retry flag, it means the token has expired and we need to refresh it.
        if (error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;

          const refreshToken = localStorage.getItem('refreshToken');
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
            { refreshToken }
          );

          if (response.status === 200) {
            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            setIsLoggedIn(true);
            setAuth({ ...auth, accessToken });

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
  }, [accessToken]);

  return { api };
};

export default useAxios;
