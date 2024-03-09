import BlogList from '../components/blogs/BlogList';
import PopularBlogs from '../components/blogs/PopularBlogs';
import FavoriteBlogs from '../components/blogs/favorites/FavoriteBlogs';
import Error from '../components/ui/Error';
import useFetchBlogs from '../hooks/blog/useFetchBlogs';

const HomePage = () => {
  const { blogs, error, hasMore, loaderRef, showMessage } = useFetchBlogs();
  const userId = JSON.parse(localStorage.getItem('authInfo'))?.userId;

  return (
    <main>
      {/* Begin Blogs  */}
      <section>
        <div className="container min-h-[calc(100vh-90px)]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
            {/* Blog Contents  */}
            <div className="space-y-3 md:col-span-5">
              {!error ? <BlogList blogs={blogs} /> : <Error error={error} />}

              {hasMore && !error && (
                <div
                  ref={loaderRef}
                  className="text-xl italic text-center text-white"
                >
                  Fetching more blogs...
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
