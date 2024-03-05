import { useContext } from 'react';
import { BlogContext } from '../contexts/BlogContext';

const useBlog = () => {
  return useContext(BlogContext);
};

export default useBlog;
