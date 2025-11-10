const ErrorMessage = ({ error }) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-140px)] mx-auto max-w-[500px] italic">
      <p className="p-8 text-3xl text-center text-red-500 rounded-md bg-teal-50">
        Something went wrong: &quot;{error}&quot;. Please try again!
      </p>
    </div>
  );
};

export default ErrorMessage;
