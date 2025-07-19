import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { RootState } from '../app/store';

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <div className='min-h-screen flex'>
      {/* Sidebar */}
      <aside className='w-64 bg-gray-800 text-white p-4 hidden md:block'>
        <div className='text-2xl font-bold mb-6'>My App</div>
        <nav className='space-y-4'>
          <a href='/dashboard' className='block hover:text-gray-300'>
            Dashboard
          </a>
          <a href='/departments/new' className='block hover:text-gray-300'>
            New Department
          </a>
          {/* Add more navigation links here */}
        </nav>
      </aside>

      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <header className='bg-white shadow p-4 flex justify-between items-center'>
          <div className='text-xl font-semibold'>Dashboard</div>
          <div className='flex items-center space-x-4'>
            <span className='text-gray-700'>Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'>
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className='p-4 bg-gray-100 flex-1'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
