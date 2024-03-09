import { createContext, useState } from 'react';

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const searchInfo = {
    searchText,
    setSearchText,
    showSearchModal,
    setShowSearchModal,
    searchResult,
    setSearchResult,
  };

  return (
    <SearchContext.Provider value={searchInfo}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
