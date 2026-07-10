import { Outlet } from 'react-router-dom';

// Header/Footer are added in Batch 2.
export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
    </div>
  );
}
