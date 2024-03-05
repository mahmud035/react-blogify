import modalCloseIcon from '../../assets/icons/close.svg';
import useSearch from '../../hooks/useSearch';
import BlogList from '../blogs/BlogList';

const SearchModal = () => {
  const { setShowSearchModal } = useSearch();

  const blogs = [];

  return (
    <section className="absolute top-0 left-0 z-50 grid w-full h-full place-items-center bg-slate-800/50 backdrop-blur-sm">
      {/* Search Container  */}
      <div className="relative w-6/12 p-4 mx-auto border rounded-lg shadow-lg bg-slate-900 border-slate-600/50 shadow-slate-400/10">
        {/* Search  */}
        <div>
          <h3 className="pl-2 my-2 text-xl font-bold text-slate-400">
            Search for Your Desire Blogs
          </h3>
          <input
            type="text"
            placeholder="Start Typing to Search"
            className="w-full p-2 text-base text-white bg-transparent border-none rounded-lg outline-none focus:ring focus:ring-indigo-600"
          />
        </div>

        {/* Search Result  */}
        <div className="">
          <h3 className="mt-6 font-bold text-slate-400">Search Results</h3>
          <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
            {/* TODO: If search result returns some blogs then render BlogList, otherwise show "No Result Found" message */}
            <BlogList blogs={blogs} />
          </div>
        </div>

        {/* Close the Modal */}
        <div onClick={() => setShowSearchModal(false)}>
          <img
            src={modalCloseIcon}
            alt="Close"
            className="absolute w-8 h-8 cursor-pointer right-2 top-2"
          />
        </div>
      </div>
    </section>
  );
};

export default SearchModal;
