import { Link } from 'react-router-dom';
import useFetchBlogAuthorProfile from '../../hooks/profile/useFetchBlogAuthorData';

const PopularBlogCard = ({ blog }) => {
  const { fetchBlogAuthorProfile } = useFetchBlogAuthorProfile();
  const {
    id,
    title,
    author: { id: profileId, firstName, lastName } = {},
    likes,
  } = blog;

  const handleViewProfile = () => {
    fetchBlogAuthorProfile(profileId, true);
  };

  return (
    <li>
      <Link to={`/blogs/${id}`}>
        <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
          {title}
        </h3>
      </Link>
      <p className="text-sm text-slate-600">
        by{' '}
        <button
          onClick={handleViewProfile}
          className="p-0 underline transition-colors bg-transparent border-none cursor-pointer text-inherit hover:text-slate-500"
          type="button"
        >
          {firstName} {lastName}
        </button>
        <span> · </span> {likes?.length} Likes
      </p>
    </li>
  );
};

export default PopularBlogCard;
