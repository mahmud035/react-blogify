import PopularBlogCard from './PopularBlogCard';

const PopularBlogList = ({ popularBlogs }) => {
  return (
    <>
      {popularBlogs?.length > 0 ? (
        popularBlogs
          ?.sort((a, b) => new Date(b?.createAt) - new Date(a?.createAt))
          ?.map((blog) => <PopularBlogCard key={blog?.id} blog={blog} />)
      ) : (
        <p className="pt-4 text-2xl text-center">No Popular Blog Data Found!</p>
      )}
    </>
  );
};

export default PopularBlogList;
