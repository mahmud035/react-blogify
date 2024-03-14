import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import useSetTitle from '../hooks/useSetTitle';

const LoginPage = () => {
  useSetTitle('Login');

  return (
    <main>
      <section className="container min-h-[calc(100vh-90px)]">
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="mb-6 text-2xl font-bold">Login</h2>

          <LoginForm />

          <p className="text-center">
            Don`t have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
