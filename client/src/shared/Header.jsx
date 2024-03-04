import { Link, useNavigate } from 'react-router-dom';
import searchIcon from '../assets/icons/search.svg';
import lwsLogo from '../assets/logo.svg';
import SearchModal from '../components/search/SearchModal';
import useAuth from '../hooks/useAuth';
import useSearch from '../hooks/useSearch';

const Header = () => {
  const { setAuth, isLoggedIn, setIsLoggedIn } = useAuth();
  const { setSearchText, showSearchModal, setShowSearchModal } = useSearch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    setAuth({});
    navigate('/login');
  };

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
                className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700"
              >
                Write
              </Link>
            </li>
            {/* Close SearchModal and clear search field */}
            {isLoggedIn && (
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
            )}

            {isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white transition-all duration-200 hover:text-white/80"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="text-white transition-all duration-200 hover:text-white/80"
                >
                  Login
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <li className="flex items-center">
                <Link to="/profile">
                  <span className="mr-2 text-white hover:text-white/80">
                    Saad Hasan
                  </span>
                </Link>

                <Link to="/profile">
                  <div className="text-white bg-orange-600 avater-img hover:text-white/80">
                    <span className="">S</span>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* WARNING: SearchModal এইভাবে ব্যবহার করা যাবে না। React Portal ব্যবহার করতে হবে এবং usePortal() নামে Custom Hook বানাতে হবে।  */}
      {showSearchModal && <SearchModal />}
    </header>
  );
};

export default Header;
