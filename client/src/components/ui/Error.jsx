const Error = ({ error }) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-140px)] -mt-20 mx-auto max-w-[420px]">
      <p className="p-8 text-3xl italic text-center text-red-500 rounded-md bg-teal-50">
        Something went wrong: `&quot;`{error}`&quot;`. Please try again!
      </p>
    </div>
  );
};

export default Error;
