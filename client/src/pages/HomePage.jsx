import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogList from '../components/blogs/BlogList';

const HomePage = () => {
  const blogs = 'blogs will come from useBlog Hook';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {/* Begin Blogs  */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {/* Blog Contents  */}
            <div className="space-y-3 md:col-span-5">
              <BlogList blogs={blogs} />
            </div>

            {/* Sidebar  */}
            <div className="md:col-span-2 h-full w-full space-y-5">
              <div className="sidebar-card">
                <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                  Most Popular 👍️
                </h3>

                <ul className="space-y-5 my-5">
                  <li>
                    {/* TODO: Change with this: /blogs/:blogId */}
                    <Link to={`/blogs/:1`}>
                      <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                        How to Auto Deploy a Next.js App on Ubuntu from GitHub
                      </h3>
                    </Link>
                    <p className="text-slate-600 text-sm">
                      by <Link to="/profile">Saad Hasan</Link>
                      <span>·</span> 100 Likes
                    </p>
                  </li>

                  <li>
                    <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                      How to Auto Deploy a Next.js App on Ubuntu from GitHub
                    </h3>
                    <p className="text-slate-600 text-sm">
                      by
                      <a href="./profile.html">Saad Hasan</a>
                      <span>·</span> 100 Likes
                    </p>
                  </li>

                  <li>
                    <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                      How to Auto Deploy a Next.js App on Ubuntu from GitHub
                    </h3>
                    <p className="text-slate-600 text-sm">
                      by
                      <a href="./profile.html">Saad Hasan</a>
                      <span>·</span> 100 Likes
                    </p>
                  </li>

                  <li>
                    <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                      How to Auto Deploy a Next.js App on Ubuntu from GitHub
                    </h3>
                    <p className="text-slate-600 text-sm">
                      by
                      <a href="./profile.html">Saad Hasan</a>
                      <span>·</span> 100 Likes
                    </p>
                  </li>
                </ul>
              </div>

              <div className="sidebar-card">
                <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                  Your Favourites ❤️
                </h3>

                <ul className="space-y-5 my-5">
                  <li>
                    {/* TODO: Change with this: /blogs/:blogId */}
                    <Link to={`/blogs/:1`}>
                      <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                        How to Auto Deploy a Next.js App on Ubuntu from GitHub
                      </h3>
                    </Link>
                    <p className="text-slate-600 text-sm">
                      #tailwindcss, #server, #ubuntu
                    </p>
                  </li>

                  <li>
                    <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                      How to Auto Deploy a Next.js App on Ubuntu from GitHub
                    </h3>
                    <p className="text-slate-600 text-sm">
                      #tailwindcss, #server, #ubuntu
                    </p>
                  </li>

                  <li>
                    <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                      How to Auto Deploy a Next.js App on Ubuntu from GitHub
                    </h3>
                    <p className="text-slate-600 text-sm">
                      #tailwindcss, #server, #ubuntu
                    </p>
                  </li>

                  <li>
                    <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                      How to Auto Deploy a Next.js App on Ubuntu from GitHub
                    </h3>
                    <p className="text-slate-600 text-sm">
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
