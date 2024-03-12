import axios from 'axios';
import { useEffect } from 'react';
import { api } from '../../api';
import { baseURL } from '../../utils';
import useAuth from './useAuth';

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  // get accessToken
  const accessToken =
    JSON.parse(localStorage.getItem('authInfo'))?.accessToken ||
    auth?.accessToken;

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
        if (error?.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;

          const refreshToken = localStorage.getItem('refreshToken');
          const response = await axios.post(`${baseURL}/auth/refresh-token`, {
            refreshToken,
          });

          if (response.status === 200) {
            const { accessToken } = response.data;

            const authInfo = JSON.parse(localStorage.getItem('authInfo'));
            if (authInfo) {
              const newAccessToken = accessToken;
              localStorage.setItem(
                'authInfo',
                JSON.stringify({ ...authInfo, accessToken: newAccessToken })
              );
            }
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
