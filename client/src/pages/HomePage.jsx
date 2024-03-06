import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { actions } from '../actions';
import BlogList from '../components/blogs/BlogList';
import PopularBlogs from '../components/blogs/PopularBlogs';
import FavoriteBlogs from '../components/blogs/favorites/FavoriteBlogs';
import Error from '../components/ui/Error';
import useBlog from '../hooks/useBlog';
import useGetUser from '../hooks/useGetUser';

const limit = 4;

const HomePage = () => {
  const user = useGetUser();
  const { blogState, blogDispatch } = useBlog();
  const { blogs, error } = blogState || {};
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const [showMessage, setShowMessage] = useState(false);

  //* Fetch Blogs Data
  useEffect(() => {
    let ignore = false;
    blogDispatch({ type: actions.blog.DATA_FETCHING });

    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/blogs?page=${page}&limit=${limit}`
        );

        if (response.data?.blogs?.length === 0) {
          setHasMore(false);
          setShowMessage(true);
        } else if (response.data?.blogs?.length > 0 && !ignore) {
          blogDispatch({
            type: actions.blog.DATA_FETCHED,
            data: response.data.blogs,
          });
          setPage((prevPage) => prevPage + 1);
        }
      } catch (error) {
        console.log(error);
        blogDispatch({
          type: actions.blog.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };

    // IntersectionObserver for infinity scrolling
    const onIntersection = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        fetchBlogs();
      }
    };

    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // cleanup
    return () => {
      ignore = true;
      if (observer) observer.disconnect();
    };
  }, [hasMore, page]);

  useEffect(() => {
    let timeoutId;

    if (showMessage) {
      timeoutId = setTimeout(() => {
        setShowMessage(false);
      }, 1500);
    }

    return () => clearTimeout(timeoutId);
  }, [showMessage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {/* Begin Blogs  */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
            {/* Blog Contents  */}
            <div className="space-y-3 md:col-span-5">
              {!error ? <BlogList blogs={blogs} /> : <Error error={error} />}

              {hasMore && !error && (
                <div ref={loaderRef} className="text-xl text-center text-white">
                  Loading more blogs...
                </div>
              )}

              {showMessage && (
                <div className="text-xl text-center text-white">
                  All products are fetched
                </div>
              )}
            </div>

            {/* Sidebar  */}
            <div className="w-full h-full space-y-5 md:col-span-2">
              <PopularBlogs />

              {/* Render FavoriteBlogs if user is loggedIn */}
              {user && <FavoriteBlogs />}
            </div>
          </div>
        </div>
      </section>
      {/* End Blogs  */}
    </main>
  );
};

export default HomePage;
