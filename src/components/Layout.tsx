import React, { useState } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { RootState } from '../app/store';
import {
  Menu,
  LayoutDashboard,
  Building2,
  UserCircle,
  LogOut,
} from 'lucide-react'; // Lucide icons

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const navLinks = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      to: '/departments/new',
      label: 'New Department',
      icon: <Building2 size={20} />,
    },
    // Add more links here as needed
  ];

  return (
    <div className='min-h-screen flex'>
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-800 text-white transition-all duration-300 ease-in-out overflow-hidden`}>
        <div className='p-4 flex items-center space-x-2'>
          <span className='text-2xl font-bold'>
            {sidebarOpen ? 'Memfile EDMS' : 'M'}
          </span>
        </div>
        <nav className='space-y-2 mt-4'>
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2 hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700' : ''
                }`
              }>
              {icon}
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <header className='bg-white shadow p-4 flex justify-between items-center'>
          <div className='flex items-center space-x-4'>
            <button
              onClick={toggleSidebar}
              className='text-gray-700 hover:text-black focus:outline-none'>
              <Menu size={24} />
            </button>
            <span className='text-xl font-semibold'>Dashboard</span>
          </div>
          <div className='flex items-center space-x-4'>
            <UserCircle size={20} className='text-gray-600' />
            <span className='text-gray-700'>Welcome, {user?.firstname}</span>
            <button
              onClick={handleLogout}
              className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center space-x-2'>
              <LogOut size={16} />
              <span>Logout</span>
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
