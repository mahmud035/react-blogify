import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogList from '../components/blogs/BlogList';
import useAuth from '../hooks/useAuth';

const HomePage = () => {
  const { auth, isLoggedIn } = useAuth();
  // console.log('auth =>', auth);
  // console.log('isLoggedIn =>', isLoggedIn);

  const blogs = 'blogs will come from useBlog Hook';

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
              <BlogList blogs={blogs} />
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
