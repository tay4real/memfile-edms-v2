import React, { useState } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { RootState } from '../app/store';
import { Menu, LayoutDashboard, Building2, LogOut } from 'lucide-react';
import clsx from 'clsx';

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      // mobile
      setSidebarOpen(!sidebarOpen);
    } else {
      // desktop
      setSidebarCollapsed(!sidebarCollapsed);
    }
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
  ];

  return (
    <div className='min-h-screen bg-gray-100 flex'>
      {/* Sidebar */}
      <aside
        className={clsx(
          'bg-gray-800 text-white fixed md:relative z-40 transition-all duration-300 ease-in-out h-screen',
          {
            'w-64':
              !sidebarCollapsed && sidebarOpen && window.innerWidth >= 768,
            'w-20': sidebarCollapsed && window.innerWidth >= 768,
            'w-64 md:w-64 absolute': sidebarOpen && window.innerWidth < 768,
            '-translate-x-full md:translate-x-0':
              !sidebarOpen && window.innerWidth < 768,
          }
        )}>
        <div className='p-4 flex items-center space-x-2 border-b border-gray-700'>
          <span className='text-2xl font-bold truncate'>
            {sidebarCollapsed ? 'M' : 'Memfile EDMS'}
          </span>
        </div>
        <nav className='space-y-2 mt-4 px-2'>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-2 p-2 text-sm font-medium rounded hover:bg-gray-700 transition-colors',
                  {
                    'bg-gray-700': isActive,
                  }
                )
              }>
              {link.icon}
              {!sidebarCollapsed && (
                <span className='whitespace-nowrap'>{link.label}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && window.innerWidth < 768 && (
        <div
          className='fixed inset-0 bg-black opacity-40 z-30 md:hidden'
          onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main content */}
      <div
        className={clsx(
          'flex-1 flex flex-col transition-all duration-300 ease-in-out min-h-screen'
        )}>
        {/* Top Nav */}
        <header className='bg-white shadow p-4 flex items-center justify-between sticky top-0 z-10'>
          <div className='flex items-center gap-4'>
            <button
              className='text-gray-700 hover:text-black focus:outline-none'
              onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            <h1 className='text-xl font-semibold hidden sm:block'>Dashboard</h1>
          </div>
          <div className='flex items-center gap-4'>
            <span className='text-gray-700 hidden sm:inline'>
              Welcome, <strong>{user?.firstname}</strong>
            </span>
            <button
              onClick={handleLogout}
              className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center gap-1'>
              <LogOut size={18} />
              <span className='hidden sm:inline'>Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className='p-4'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
