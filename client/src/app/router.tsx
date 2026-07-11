import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import NotFoundPage from '@/components/layout/NotFoundPage';
import PrivateRoute from '@/features/auth/PrivateRoute';
import HomePage from '@/features/blog/pages/HomePage';
import BlogDetailsPage from '@/features/blog/pages/BlogDetailsPage';
import CreateBlogPage from '@/features/blog/pages/CreateBlogPage';
import EditBlogPage from '@/features/blog/pages/EditBlogPage';
import LoginPage from '@/features/auth/pages/LoginPage';
import RegistrationPage from '@/features/auth/pages/RegistrationPage';
import ProfilePage from '@/features/profile/pages/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegistrationPage /> },
      { path: 'profile/:profileId', element: <ProfilePage /> },
      { path: 'blogs/:blogId', element: <BlogDetailsPage /> },
      {
        path: 'create-blog',
        element: (
          <PrivateRoute>
            <CreateBlogPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'edit-blog/:blogId',
        element: (
          <PrivateRoute>
            <EditBlogPage />
          </PrivateRoute>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
