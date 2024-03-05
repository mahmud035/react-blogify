import useProfile from '../../hooks/useProfile';
import BlogList from '../blogs/BlogList';

const MyBlogs = () => {
  const { profile } = useProfile();
  const { blogs } = profile || {};

  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
      <div className="my-6 space-y-4">
        <BlogList blogs={blogs} />
      </div>
    </>
  );
};

export default MyBlogs;
