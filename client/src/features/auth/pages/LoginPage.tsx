import { Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  useDocumentTitle('Login');

  return (
    <main>
      <section className="container min-h-[calc(100vh-90px)]">
        <div className="w-full p-8 mx-auto mt-12 rounded-md md:w-1/2 bg-surface border border-slate-800/60">
          <h2 className="mb-6 text-2xl font-bold">Login</h2>
          <LoginForm />
          <p className="text-center">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
