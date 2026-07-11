import { useEffect } from 'react';

/** Sets `document.title` to "React Blogify | <title>". */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = `React Blogify | ${title}`;
  }, [title]);
}
