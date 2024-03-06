import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import BlogDetailsPage from '../pages/BlogDetailsPage';
import CreateBlogPage from '../pages/CreateBlogPage';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import RegistrationPage from '../pages/RegistrationPage';
import PrivateRoutes from './PrivateRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/profile/:profileId',
        element: <ProfilePage />,
      },
      {
        path: '/blogs/:blogId',
        element: <BlogDetailsPage />,
      },
      {
        path: '/create-blog',
        element: (
          <PrivateRoutes>
            <CreateBlogPage />
          </PrivateRoutes>
        ),
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegistrationPage />,
      },
    ],
  },
]);

export default router;
