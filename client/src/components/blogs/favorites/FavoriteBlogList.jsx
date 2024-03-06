import useBlog from '../../../hooks/useBlog';
import FavoriteBlogCard from './FavoriteBlogCard';

const FavoriteBlogList = () => {
  const { blogState } = useBlog();
  const { favoritesBlogs } = blogState || {};

  return (
    <ul className="my-5 space-y-5">
      {favoritesBlogs?.length > 0 ? (
        favoritesBlogs
          ?.sort((a, b) => new Date(b?.createAt) - new Date(a?.createAt))
          ?.map((blog) => <FavoriteBlogCard key={blog?.id} blog={blog} />)
      ) : (
        <p className="pt-4 text-2xl text-center">
          You do not have any favorite blog!
        </p>
      )}
    </ul>
  );
};

export default FavoriteBlogList;
