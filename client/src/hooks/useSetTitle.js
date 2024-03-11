import { useEffect } from 'react';

const useSetTitle = (title) => {
  useEffect(() => {
    window.document.title = `React Blogify | ${title}`;
  }, [title]);
};

export default useSetTitle;
