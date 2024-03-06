import { Link } from 'react-router-dom';

const FavoriteBlogCard = ({ blog }) => {
  const { id, title, tags } = blog || {};

  return (
    <li>
      {/* TODO: Change with this: /blogs/:blogId */}
      <Link to={`/blogs/${id}`}>
        <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
          {title}
        </h3>
      </Link>
      <p className="text-sm text-slate-600">#tailwindcss, #server, #ubuntu</p>
    </li>
  );
};

export default FavoriteBlogCard;
