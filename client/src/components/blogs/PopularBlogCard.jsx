import { Link } from 'react-router-dom';
import useFetchBlogAuthorData from '../../hooks/profile/useFetchBlogAuthorData';

const PopularBlogCard = ({ blog }) => {
  const { fetchBlogAuthorData } = useFetchBlogAuthorData();
  const {
    id,
    title,
    author: { id: profileId, firstName, lastName } = {},
    likes,
  } = blog;

  return (
    <li>
      <Link to={`/blogs/${id}`}>
        <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
          {title}
        </h3>
      </Link>
      <p className="text-sm text-slate-600">
        by{' '}
        <span
          onClick={() => {
            fetchBlogAuthorData(profileId);
          }}
          className="cursor-pointer"
        >
          {firstName} {lastName}
        </span>
        <span>·</span> {likes?.length} Likes
      </p>
    </li>
  );
};

export default PopularBlogCard;
