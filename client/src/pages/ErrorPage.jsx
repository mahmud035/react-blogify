import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <section className="flex items-center h-screen p-16 dark:dark:bg-[#030317] dark:dark:text-white">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="font-extrabold mb-7 text-9xl">
            <span className="sr-only">Error</span>
            {error?.status}
          </h2>
          <p className="mb-12 text-2xl font-semibold md:text-3xl">
            Sorry, couldn`t find this page.
          </p>
          <Link
            to="/"
            className="px-8 py-3 font-semibold rounded dark:dark:bg-[#14b8a6]  dark:dark:text-white"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
