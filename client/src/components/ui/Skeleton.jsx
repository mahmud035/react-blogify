const Skeleton = () => {
  return (
    <div className="blog-card animate-pulse">
      <svg
        className="text-gray-200 blog-thumb max-h-48 dark:text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
      </svg>
      <div className="relative mt-2">
        <h3 className="h-4 text-xl bg-gray-900 rounded-full text-slate-300 lg:text-2xl"></h3>
        <p className="h-8 mt-3 mb-6 text-base bg-gray-900 rounded-full text-slate-500"></p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 capitalize">
            <div className="text-white">
              <div className="w-12 h-12 text-gray-200 bg-gray-900 avater-img hover:text-white/80 dark:text-gray-600"></div>
            </div>
            <div>
              <h5 className="w-40 h-4 text-sm bg-gray-900 rounded-full text-slate-900"></h5>
              <div className="flex items-center w-20 h-4 mt-3 text-xs bg-gray-900 rounded-full text-slate-700">
                <span></span>
              </div>
            </div>
          </div>
          <div className="w-20 h-3 px-2 py-1 text-sm bg-gray-900 rounded-full text-slate-700">
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
