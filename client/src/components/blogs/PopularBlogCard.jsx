import { Link } from 'react-router-dom';

const PopularBlogCard = ({ blog }) => {
  const { id, title, author: { firstName, lastName } = {}, likes } = blog;

  return (
    <li>
      {/* TODO: Change with this: /blogs/:blogId */}
      <Link to={`/blogs/${id}`}>
        <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
          {title}
        </h3>
      </Link>
      <p className="text-sm text-slate-600">
        by{' '}
        <Link to="/profile">
          {firstName} {lastName}
        </Link>
        <span>·</span> {likes?.length} Likes
      </p>
    </li>
  );
};

export default PopularBlogCard;
