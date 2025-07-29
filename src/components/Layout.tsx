import React, { useState } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { RootState } from '../app/store';
import {
  LayoutDashboard,
  Building2,
  Landmark,
  FolderOpen,
  User2,
  Mail,
  Send,
  FileText,
  FilePlus,
  Users,
  Settings2,
  FileCheck2,
  FileCog,
  LogOut,
  Menu,
} from 'lucide-react';
import clsx from 'clsx';

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const userRole = user?.role || 'User';

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

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

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const navLinks = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      roles: ['Admin', 'Registry Officer', 'User'],
    },
    {
      label: 'MDAs',
      icon: <Landmark size={20} />,
      roles: ['Admin'],
      children: [
        {
          to: '/mdas',
          label: 'All MDAs',
          icon: <Landmark size={18} />,
          roles: ['Admin'],
        },
        {
          to: '/mdas/create',
          label: 'Create MDA',
          icon: <FilePlus size={18} />,
          roles: ['Admin'],
        },
      ],
    },
    {
      label: 'Departments',
      icon: <Building2 size={20} />,
      roles: ['Admin', 'Registry Officer'],
      children: [
        {
          to: '/departments',
          label: 'All Departments',
          icon: <Building2 size={18} />,
          roles: ['Admin', 'Registry Officer'],
        },
        {
          to: '/departments/create',
          label: 'Create Department',
          icon: <FilePlus size={18} />,
          roles: ['Admin'],
        },
      ],
    },
    {
      label: 'General Files',
      icon: <FolderOpen size={20} />,
      roles: ['Admin', 'Registry Officer'],
      children: [
        {
          to: '/general-files',
          label: 'All General Files',
          icon: <FileText size={18} />,
          roles: ['Admin', 'Registry Officer'],
        },
        {
          to: '/general-files/create',
          label: 'Add General File',
          icon: <FilePlus size={18} />,
          roles: ['Admin', 'Registry Officer'],
        },
      ],
    },
    {
      label: 'User Management',
      icon: <Users size={20} />,
      roles: ['Admin'],
      children: [
        {
          to: '/users',
          label: 'All Users',
          icon: <User2 size={18} />,
          roles: ['Admin'],
        },
        {
          to: '/users/create',
          label: 'Add User',
          icon: <FilePlus size={18} />,
          roles: ['Admin'],
        },
      ],
    },
    {
      label: 'Incoming Mails',
      icon: <Mail size={20} />,
      roles: ['Admin', 'Registry Officer'],
      children: [
        {
          to: '/incoming-mails',
          label: 'All Incoming Mails',
          icon: <Mail size={18} />,
          roles: ['Admin', 'Registry Officer'],
        },
        {
          to: '/incoming-mails/create',
          label: 'Add Incoming Mail',
          icon: <FilePlus size={18} />,
          roles: ['Admin', 'Registry Officer'],
        },
      ],
    },
    {
      label: 'Outgoing Mails',
      icon: <Send size={20} />,
      roles: ['Admin', 'Registry Officer'],
      children: [
        {
          to: '/outgoing-mails',
          label: 'All Outgoing Mails',
          icon: <Send size={18} />,
          roles: ['Admin', 'Registry Officer'],
        },
        {
          to: '/outgoing-mails/create',
          label: 'Add Outgoing Mail',
          icon: <FilePlus size={18} />,
          roles: ['Admin', 'Registry Officer'],
        },
      ],
    },
    {
      label: 'File Management',
      icon: <FileText size={20} />,
      roles: ['Admin', 'Registry Officer', 'User'],
      children: [
        {
          to: '/files/desk-files',
          label: 'File at Desk',
          icon: <FileCheck2 size={18} />,
          roles: ['Admin', 'Registry Officer', 'User'],
        },
        {
          to: '/files/file-operations',
          label: 'File Operations',
          icon: <FileCog size={18} />,
          roles: ['Admin', 'Registry Officer', 'User'],
        },
      ],
    },
  ];

  return (
    <div className='min-h-screen bg-gray-100 flex'>
      {/* Sidebar */}
      <aside
        className={clsx(
          'bg-gray-800 text-white fixed md:relative z-40 transition-all duration-300 ease-in-out h-width-full',
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
          {navLinks
            .filter((link) => link.roles?.includes(userRole))
            .map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    className='w-full flex items-center justify-between p-2 text-sm font-medium text-left hover:bg-gray-700 rounded transition'
                    onClick={() => toggleMenu(link.label)}>
                    <div className='flex items-center gap-2'>
                      {link.icon}
                      {!sidebarCollapsed && <span>{link.label}</span>}
                    </div>
                    {!sidebarCollapsed && (
                      <svg
                        className={clsx('w-4 h-4 transition-transform', {
                          'rotate-90': openMenus[link.label],
                        })}
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    )}
                  </button>
                  {/* Dropdown items */}
                  {openMenus[link.label] && !sidebarCollapsed && (
                    <div className='ml-6 space-y-1'>
                      {link.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className={({ isActive }) =>
                            clsx(
                              'block text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded px-2 py-1',
                              {
                                'bg-gray-700 text-white': isActive,
                              }
                            )
                          }>
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center gap-2 p-2 text-sm font-medium rounded hover:bg-gray-700 transition',
                      {
                        'bg-gray-700': isActive,
                      }
                    )
                  }>
                  {link.icon}
                  {!sidebarCollapsed && <span>{link.label}</span>}
                </NavLink>
              )
            )}
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
