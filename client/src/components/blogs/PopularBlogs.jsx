import useFetchPopularBlogs from '../../hooks/blog/useFetchPopularBlogs';
import PopularBlogList from './PopularBlogList';

const PopularBlogs = () => {
  const { popularBlogs } = useFetchPopularBlogs();

  return (
    <div className="sidebar-card">
      <h3 className="text-xl font-semibold text-slate-300 lg:text-2xl">
        Most Popular 👍️
      </h3>

      <ul className="my-5 space-y-5">
        <PopularBlogList popularBlogs={popularBlogs} />
      </ul>
    </div>
  );
};

export default PopularBlogs;
