import useFetchFavoriteBlogs from '../../../hooks/blog/useFetchFavoriteBlogs';
import FavoriteBlogList from './FavoriteBlogList';

const FavoriteBlogs = () => {
  const userId = JSON.parse(localStorage.getItem('authInfo'))?.userId;
  // Fetch Favorites Blogs
  useFetchFavoriteBlogs(userId);

  return (
    <div className="sidebar-card">
      <h3 className="text-xl font-semibold text-slate-300 lg:text-2xl">
        Your Favourites ❤️
      </h3>

      <FavoriteBlogList />
    </div>
  );
};

export default FavoriteBlogs;
