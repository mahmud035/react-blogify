import { Link, useNavigate } from 'react-router-dom';
import { actions } from '../actions';
import searchIcon from '../assets/icons/search.svg';
import lwsLogo from '../assets/logo.svg';
import SearchModal from '../components/search/SearchModal';
import useAuth from '../hooks/auth/useAuth';
import useGetUser from '../hooks/auth/useGetUser';
import useProfile from '../hooks/profile/useProfile';
import usePortal from '../hooks/search/usePortal';
import useSearch from '../hooks/search/useSearch';
import { getUserAvatar } from '../utils';

const Header = () => {
  const { setSearchText, showSearchModal, setShowSearchModal } = useSearch();
  const { profileDispatch } = useProfile();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const user = useGetUser();
  const { renderPortal } = usePortal();

  // Show dummy avatar if user's avatar is not found
  const userNameFirstChar = user?.firstName?.slice(0, 1)?.toUpperCase();
  const userAvatar = getUserAvatar(user?.avatar, userNameFirstChar);

  //* Logout
  const handleLogout = () => {
    localStorage.removeItem('authInfo');
    localStorage.removeItem('profileId');
    localStorage.removeItem('blogToEdit');
    setAuth({});
    profileDispatch({ type: actions.profile.USER_LOGOUT });
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
            {user && (
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

            {user ? (
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

            {user && (
              <li className="flex items-center">
                <Link to={`/profile/${user?.id}`}>
                  <span className="mr-2 text-white hover:text-white/80">
                    {user?.firstName} {user?.lastName}
                  </span>
                </Link>

                <Link to={`/profile/${user?.id}`}>
                  <img
                    className="font-bold text-white avater-img hover:text-white/80"
                    src={userAvatar}
                    alt="Profile Image"
                  />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Render Modal Using Portal */}
      {showSearchModal && renderPortal(<SearchModal />)}
    </header>
  );
};

export default Header;
