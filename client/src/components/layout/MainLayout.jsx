import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../shared/Footer';
import Header from '../../shared/Header';

const MainLayout = () => {
  const location = useLocation();
  const showFooter =
    location?.pathname !== '/login' && location?.pathname !== '/register';

  return (
    <div>
      <Header />
      <Outlet />
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
