import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (userId && accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const authInfo = {
    auth,
    setAuth,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
