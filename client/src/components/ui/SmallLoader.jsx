const SmallLoader = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-167px)] -mt-20  mx-auto max-w-[420px]">
      <p className="p-8 text-3xl text-center text-[#00d991] rounded-md bg-teal-50 ">
        {message}
      </p>
    </div>
  );
};

export default SmallLoader;
