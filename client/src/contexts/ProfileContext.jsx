import { createContext, useReducer } from 'react';
import {
  profileInitialState,
  profileReducer,
} from '../reducers/ProfileReducer';

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, profileInitialState);

  const profileInfo = {
    profile: state,
    profileDispatch: dispatch,
  };

  return (
    <ProfileContext.Provider value={profileInfo}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
