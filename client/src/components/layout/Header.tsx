import { Link } from 'react-router-dom';
import logo from '@/assets/logo.svg';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { AVATAR_FALLBACK, getAvatarUrl } from '@/utils/media';

export default function Header() {
  const { user } = useAuth();
  const { mutate: logout, isPending } = useLogout();

  return (
    <header>
      <nav className="container">
        <Link to="/">
          <img className="w-32" src={logo} alt="React Blogify" />
        </Link>

        <ul className="flex items-center space-x-5">
          <li>
            <Link to="/create-blog" className="btn-primary">
              Write
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <button
                  type="button"
                  onClick={() => logout()}
                  disabled={isPending}
                  className="transition-all hover:text-white/80 disabled:opacity-60"
                >
                  Logout
                </button>
              </li>
              <li className="flex items-center">
                <Link
                  to={`/profile/${user.id}`}
                  className="mr-2 transition-all hover:text-white/80"
                >
                  {user.firstName} {user.lastName}
                </Link>
                <Link to={`/profile/${user.id}`}>
                  <img
                    className="object-cover avatar-img"
                    src={getAvatarUrl(user.avatar, user.firstName)}
                    onError={(e) => (e.currentTarget.src = AVATAR_FALLBACK)}
                    alt="Profile"
                  />
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="transition-all hover:text-white/80">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
