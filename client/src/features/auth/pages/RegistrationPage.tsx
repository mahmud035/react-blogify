import { Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import RegistrationForm from '../components/RegistrationForm';

export default function RegistrationPage() {
  useDocumentTitle('Register');

  return (
    <main>
      <section className="container min-h-[calc(100vh-90px)]">
        <div className="w-full p-8 mx-auto mt-12 rounded-md md:w-1/2 bg-surface border border-slate-800/60">
          <h2 className="mb-6 text-2xl font-bold">Register</h2>
          <RegistrationForm />
          <p className="text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
