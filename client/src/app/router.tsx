import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import NotFoundPage from '@/components/layout/NotFoundPage';
import HomePage from '@/features/blog/pages/HomePage';
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
      // Batch 3: blogs/:blogId, create-blog, edit-blog/:blogId
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
