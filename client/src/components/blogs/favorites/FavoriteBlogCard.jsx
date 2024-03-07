import { Link } from 'react-router-dom';

const FavoriteBlogCard = ({ blog }) => {
  const { id, title, tags } = blog || {};

  const formattedTags = tags
    ?.split(',')
    ?.map((tag) => `#${tag.trim()}`)
    .join(', ');

  return (
    <li>
      <Link to={`/blogs/${id}`}>
        <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
          {title}
        </h3>
      </Link>

      <p className="text-sm text-slate-600">{formattedTags}</p>
    </li>
  );
};

export default FavoriteBlogCard;
