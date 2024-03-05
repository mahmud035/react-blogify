import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './contexts/AuthContext';
import BlogProvider from './contexts/BlogContext';
import ProfileProvider from './contexts/ProfileContext';
import SearchProvider from './contexts/SearchContext';
import './index.css';
import router from './routes/routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <SearchProvider>
          <BlogProvider>
            <RouterProvider router={router} />
            <ToastContainer position="top-center" autoClose={1500} />
          </BlogProvider>
        </SearchProvider>
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>
);
