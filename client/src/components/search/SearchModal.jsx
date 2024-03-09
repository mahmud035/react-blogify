import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import modalCloseIcon from '../../assets/icons/close.svg';
import useDebounce from '../../hooks/search/useDebounce';
import useSearch from '../../hooks/search/useSearch';
import BlogList from '../blogs/BlogList';

const SearchModal = () => {
  const { setSearchText, setShowSearchModal, searchResult, setSearchResult } =
    useSearch();
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef(null);

  //* Use Debounce for Searching
  const debouncedSearch = useDebounce(async (term) => {
    setLoading(true);
    setSearchText(term);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/search?q=${term}`
      );

      if (response.status === 200) {
        setLoading(false);
      }
      if (response.status === 200 && response.data.length > 0) {
        setSearchResult(response.data.data);
      }
    } catch (error) {
      // console.error(error);
      setLoading(false);
      setSearchText('');
      setSearchResult([]);
    }
  }, 500);

  const handleInputChange = (e) => {
    const value = e.target.value.trim().toLowerCase();
    setLoading(true);
    setKeyword(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  return (
    <section className="absolute top-0 left-0 z-50 grid w-full h-full place-items-center bg-slate-800/80 backdrop-blur-sm">
      {/* Search Container  */}
      <div className="relative w-6/12 p-4 mx-auto border rounded-lg shadow-lg bg-slate-900 border-slate-600/50 shadow-slate-400/10">
        {/* Search  */}
        <div>
          <h3 className="pl-2 my-2 text-xl font-bold text-slate-400">
            Search for Your Desire Blogs
          </h3>
          <input
            ref={searchInputRef}
            value={keyword}
            onChange={handleInputChange}
            type="text"
            placeholder="Start Typing to Search"
            className="w-full p-2 text-base text-white bg-transparent border-none rounded-lg outline-none focus:ring focus:ring-indigo-600"
          />
        </div>

        {/* Search Result  */}
        <div className="">
          <h3 className="mt-6 font-bold text-slate-400">Search Results</h3>
          <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
            {loading ? (
              <p className="py-8 text-2xl italic text-center">
                Fetching Blog For Title:{' '}
                <span className="text-[#00d991]">{`'${keyword}'`}</span>
              </p>
            ) : (
              <BlogList blogs={searchResult} keyword={keyword} />
            )}
          </div>
        </div>

        {/* Close the Modal */}
        <div
          onClick={() => {
            setShowSearchModal(false);
            setKeyword('');
            setSearchText('');
            setSearchResult([]);
          }}
        >
          <img
            src={modalCloseIcon}
            alt="Close"
            className="absolute w-8 h-8 cursor-pointer right-2 top-2"
          />
        </div>
      </div>
    </section>
  );
};

export default SearchModal;
