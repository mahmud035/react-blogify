import { useContext } from 'react';
import { ProfileContext } from '../contexts/ProfileContext';

const useProfile = () => {
  return useContext(ProfileContext);
};

export default useProfile;
