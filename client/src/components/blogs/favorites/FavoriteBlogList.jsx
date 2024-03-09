import useProfile from '../../../hooks/profile/useProfile';
import FavoriteBlogCard from './FavoriteBlogCard';

const FavoriteBlogList = () => {
  const { profile } = useProfile();
  const { user } = profile || {};

  return (
    <ul className="my-5 space-y-5">
      {user?.favourites?.length > 0 ? (
        user?.favourites
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
