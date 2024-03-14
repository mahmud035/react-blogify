import BlogList from '../components/blogs/BlogList';
import PopularBlogs from '../components/blogs/PopularBlogs';
import FavoriteBlogs from '../components/blogs/favorites/FavoriteBlogs';
import useFetchBlogs from '../hooks/blog/useFetchBlogs';
import useSetTitle from '../hooks/useSetTitle';

const HomePage = () => {
  const { blogs, error, hasMore, loaderRef, showMessage } = useFetchBlogs();
  const userId = JSON.parse(localStorage.getItem('authInfo'))?.userId;
  useSetTitle('Home');

  //* Decide what to render on UI
  let content;

  if (!error && blogs?.length > 0) {
    content = <BlogList blogs={blogs} />;
  }

  return (
    <main>
      {/* Begin Blogs  */}
      <section>
        <div className="container min-h-[calc(100vh-90px)] pb-12">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
            {/* Blog Contents  */}
            <div className="space-y-3 md:col-span-5">
              {content}

              {hasMore && !error && (
                <div
                  ref={loaderRef}
                  className="text-xl italic text-center text-white"
                >
                  Fetching blogs...
                </div>
              )}

              {showMessage && (
                <div className="text-xl italic text-center text-white">
                  All blogs are fetched!
                </div>
              )}
            </div>

            {/* Sidebar  */}
            <div className="w-full h-full space-y-5 md:col-span-2">
              <PopularBlogs />

              {/* Render FavoriteBlogs if user is loggedIn */}
              {userId && <FavoriteBlogs />}
            </div>
          </div>
        </div>
      </section>
      {/* End Blogs  */}
    </main>
  );
};

export default HomePage;
