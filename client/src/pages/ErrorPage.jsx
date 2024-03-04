import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="text-red-500">{error.statusText || error.message}</i>
      </p>
      <Link to="/">
        <button className="text-white font-semibold bg-[#14b8a6] px-3 py-2.5 rounded-md">
          Back To Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
