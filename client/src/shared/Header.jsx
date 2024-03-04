import { Link } from 'react-router-dom';
import searchIcon from '../assets/icons/search.svg';
import lwsLogo from '../assets/logo.svg';
import SearchModal from '../components/search/SearchModal';
import useSearch from '../hooks/useSearch';

const Header = () => {
  const { setSearchText, showSearchModal, setShowSearchModal } = useSearch();

  return (
    <header>
      <nav className="container">
        <div>
          <Link to="/">
            <img className="w-32" src={lwsLogo} alt="lwsLogo" />
          </Link>
        </div>

        <div>
          <ul className="flex items-center space-x-5">
            <li>
              <Link
                to="/create-blog"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Write
              </Link>
            </li>
            {/* Close SearchModal and clear search field */}
            <li
              onClick={() => {
                setShowSearchModal(true);
                setSearchText('');
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              {/* A Search Modal will Open */}
              <img src={searchIcon} alt="Search" />
              <span>Search</span>
            </li>
            <li>
              <Link
                to="/login"
                className="text-white hover:text-white/80 transition-all duration-200"
              >
                Login
              </Link>
            </li>
            <li className="flex items-center">
              <Link to="/profile">
                <div className="avater-img bg-orange-600 text-white hover:text-white/80">
                  <span className="">S</span>
                </div>
              </Link>

              <Link to="/profile">
                <span className="text-white ml-2 hover:text-white/80">
                  Saad Hasan
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* WARNING: SearchModal এইভাবে ব্যবহার করা যাবে না। React Portal ব্যবহার করতে হবে এবং usePortal() নামে Custom Hook বানাতে হবে।  */}
      {showSearchModal && <SearchModal />}
    </header>
  );
};

export default Header;
