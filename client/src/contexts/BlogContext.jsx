import { createContext, useReducer } from 'react';
import { blogInitialState, blogReducer } from '../reducers/BlogReducer';

export const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, blogInitialState);

  const blogInfo = {
    blogState: state,
    blogDispatch: dispatch,
  };

  return (
    <BlogContext.Provider value={blogInfo}>{children}</BlogContext.Provider>
  );
};

export default BlogProvider;
