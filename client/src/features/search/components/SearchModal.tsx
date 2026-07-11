import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import closeIcon from '@/assets/icons/close.svg';
import searchIcon from '@/assets/icons/search.svg';
import BlogList from '@/features/blog/components/BlogList';
import { useSearchBlogs } from '../hooks/useSearchBlogs';

interface SearchModalProps {
  onClose: () => void;
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, isFetching, term } = useSearchBlogs(keyword);
  const results = data?.results ?? [];
  const loading = isFetching && term.length > 0;

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 grid w-full h-full place-items-center bg-slate-800/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
    >
      <div className="relative w-10/12 p-4 mx-auto border rounded-lg shadow-lg sm:w-8/12 md:w-6/12 bg-slate-900 border-slate-600/50 shadow-slate-400/10">
        <div className="relative">
          <h3
            id="search-modal-title"
            className="pl-2 my-2 text-xl font-bold text-slate-400"
          >
            Search for Your Desired Blogs
          </h3>

          {loading ? (
            <div className="absolute left-2 top-12 h-4 w-4 animate-spin rounded-full border-2 border-dashed border-accent" />
          ) : (
            <img src={searchIcon} className="absolute left-2 top-12" alt="" />
          )}
          <input
            ref={inputRef}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            placeholder="Start typing to search"
            aria-label="Search blogs"
            className="w-full p-2 pl-10 text-base text-white bg-transparent border-none rounded-lg outline-none focus:ring focus:ring-primary"
          />
        </div>

        <div>
          <h3 className="mt-6 font-bold text-slate-400">
            Search Results: {results.length}
          </h3>
          <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-auto overscroll-contain">
            {loading ? (
              <p className="py-8 text-2xl italic text-center">
                Fetching blogs for title:{' '}
                <span className="text-accent">{`'${term}'`}</span>
              </p>
            ) : term.length === 0 ? (
              <p className="py-8 italic text-center text-slate-500">
                Type a blog title to begin.
              </p>
            ) : (
              <BlogList
                blogs={results}
                keyword={term}
                emptyMessage={`No blogs found for '${term}'.`}
              />
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute w-8 h-8 p-0 transition-opacity bg-transparent border-none cursor-pointer right-2 top-2 hover:opacity-80"
          aria-label="Close search modal"
        >
          <img src={closeIcon} alt="" className="w-full h-full pointer-events-none" />
        </button>
      </div>
    </div>,
    document.body,
  );
}
