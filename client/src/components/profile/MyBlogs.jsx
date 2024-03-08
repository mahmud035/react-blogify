import useShowLoggedInUserInfo from '../../hooks/profile/useShowLoggedInUserInfo';
import useProfile from '../../hooks/useProfile';
import BlogList from '../blogs/BlogList';

const MyBlogs = () => {
  const { showLoggedInUserInfo } = useShowLoggedInUserInfo();
  const { profile } = useProfile();

  const blogs = showLoggedInUserInfo
    ? profile?.user?.blogs
    : profile?.blogAuthor?.blogs;

  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">
        {showLoggedInUserInfo
          ? 'Your Blogs'
          : `${profile?.blogAuthor?.firstName} ${profile?.blogAuthor?.lastName}'s Blog`}
      </h4>
      <div className="my-6 space-y-4">
        <BlogList blogs={blogs} />
      </div>
    </>
  );
};

export default MyBlogs;
