import { Link } from 'react-router-dom';
import { useFavouriteBlogs } from '../hooks/useFavouriteBlogs';

export default function FavouriteBlogs() {
  const { data, isLoading, isError } = useFavouriteBlogs();
  const blogs = data?.blogs ?? [];

  return (
    <div className="sidebar-card">
      <h3 className="text-xl font-semibold text-slate-300 lg:text-2xl">
        Your Favourites ❤️
      </h3>

      {isError ? (
        <p className="my-5 text-sm italic text-danger">
          Couldn’t load favourites.
        </p>
      ) : isLoading ? (
        <ul className="my-5 space-y-4" aria-hidden>
          {[0, 1].map((i) => (
            <li key={i} className="h-4 rounded-full bg-slate-800 animate-pulse" />
          ))}
        </ul>
      ) : blogs.length === 0 ? (
        <p className="my-5 text-sm italic text-slate-600">
          No favourites yet.
        </p>
      ) : (
        <ul className="my-5 space-y-5">
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
                  {blog.title}
                </h3>
              </Link>
              <p className="text-sm text-slate-600">
                {blog.tags.map((tag) => `#${tag}`).join(', ')}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
