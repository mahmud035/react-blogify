import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '@/components/ui/Loader';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
