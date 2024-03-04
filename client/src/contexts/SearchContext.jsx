import { createContext, useState } from 'react';

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const searchInfo = {
    searchText,
    setSearchText,
    showSearchModal,
    setShowSearchModal,
  };

  return (
    <SearchContext.Provider value={searchInfo}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
