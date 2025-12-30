import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const Layout = () => {
  return (
    <div className="layout-background">
      <div className="ellipse-pink w-72 h-72 top-1/4 right-1/4" />
      <div className="ellipse-green w-64 h-64 bottom-1/3 left-1/4" />
      
      <div className="relative z-10">
        <Sidebar />
        <main className="ml-64 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};