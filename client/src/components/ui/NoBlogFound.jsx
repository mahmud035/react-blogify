import useSearch from '../../hooks/useSearch';

const NoBlogFound = ({ message, className = undefined }) => {
  const { searchText } = useSearch();

  return (
    <div
      className={`flex items-center justify-center h-10 mx-auto w-96 sm:w-[600px] md:w-[700px] lg:w-[800px] ${className} `}
    >
      <p className="p-8 text-3xl text-center text-black rounded-md bg-teal-50 ">
        {message}
        {/* <span className="text-[#00d991]">for: {`"${searchText}"`}</span> */}
      </p>
    </div>
  );
};

export default NoBlogFound;
