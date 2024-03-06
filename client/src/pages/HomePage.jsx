import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { actions } from '../actions';
import BlogList from '../components/blogs/BlogList';
import Error from '../components/ui/Error';
import useBlog from '../hooks/useBlog';

const limit = 4;

const HomePage = () => {
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
                <div
                  ref={loaderRef}
                  className="text-2xl text-center text-white"
                >
                  Loading more blogs...
                </div>
              )}

              {showMessage && (
                <div className="text-2xl text-center text-white">
                  All products are fetched
                </div>
              )}
            </div>

            {/* Sidebar  */}
            <div className="w-full h-full space-y-5 md:col-span-2">
              <div className="sidebar-card">
                <h3 className="text-xl font-semibold text-slate-300 lg:text-2xl">
                  Most Popular 👍️
                </h3>

                <ul className="my-5 space-y-5">
                  <li>
                    {/* TODO: Change with this: /blogs/:blogId */}
                    <Link to={`/blogs/:1`}>
                      <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
                        How to Auto Deploy a Next.js App on Ubuntu from GitHub
                      </h3>
                    </Link>
                    <p className="text-sm text-slate-600">
                      by <Link to="/profile">Saad Hasan</Link>
                      <span>·</span> 100 Likes
                    </p>
                  </li>

                  <li>
                    <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
                      How to Auto Deploy a Next.js App on Ubuntu from GitHub
                    </h3>
                    <p className="text-sm text-slate-600">
                      by
                      <a href="./profile.html">Saad Hasan</a>
                      <span>·</span> 100 Likes
                    </p>
                  </li>

                  <li>
                    <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
                      How to Auto Deploy a Next.js App on Ubuntu from GitHub
                    </h3>
                    <p className="text-sm text-slate-600">
                      by
                      <a href="./profile.html">Saad Hasan</a>
                      <span>·</span> 100 Likes
                    </p>
                  </li>

                  <li>
                    <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
                      How to Auto Deploy a Next.js App on Ubuntu from GitHub
                    </h3>
                    <p className="text-sm text-slate-600">
                      by
                      <a href="./profile.html">Saad Hasan</a>
                      <span>·</span> 100 Likes
                    </p>
                  </li>
                </ul>
              </div>

              <div className="sidebar-card">
                <h3 className="text-xl font-semibold text-slate-300 lg:text-2xl">
                  Your Favourites ❤️
                </h3>

                <ul className="my-5 space-y-5">
                  <li>
                    {/* TODO: Change with this: /blogs/:blogId */}
                    <Link to={`/blogs/:1`}>
                      <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
                        How to Auto Deploy a Next.js App on Ubuntu from GitHub
                      </h3>
                    </Link>
                    <p className="text-sm text-slate-600">
                      #tailwindcss, #server, #ubuntu
                    </p>
                  </li>

                  <li>
                    <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
                      How to Auto Deploy a Next.js App on Ubuntu from GitHub
                    </h3>
                    <p className="text-sm text-slate-600">
                      #tailwindcss, #server, #ubuntu
                    </p>
                  </li>

                  <li>
                    <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
                      How to Auto Deploy a Next.js App on Ubuntu from GitHub
                    </h3>
                    <p className="text-sm text-slate-600">
                      #tailwindcss, #server, #ubuntu
                    </p>
                  </li>

                  <li>
                    <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
                      How to Auto Deploy a Next.js App on Ubuntu from GitHub
                    </h3>
                    <p className="text-sm text-slate-600">
                      #tailwindcss, #server, #ubuntu
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Blogs  */}
    </main>
  );
};

export default HomePage;
