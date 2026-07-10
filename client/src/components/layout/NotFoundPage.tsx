import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="container grid min-h-screen place-items-center text-center">
      <div>
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-3 text-muted">The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="inline-block mt-6 btn-primary">
          Back home
        </Link>
      </div>
    </main>
  );
}
