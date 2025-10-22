import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ title = 'Home' }) => {
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Work Queue', href: '/workqueue' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Toolkit', href: '/toolkit' },
  ];

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-[280px_1fr_auto] gap-4 items-center px-5 py-3.5 bg-gradient-to-b from-brand to-brand-2 text-white shadow-[0_10px_30px_rgba(17,20,24,.06),0_2px_8px_rgba(17,20,24,.04)]">
      {/* Logo & Title */}
      <div className="flex gap-3 items-center">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white to-white/90 grid place-items-center">
          <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 fill-brand">
            <path d="M12 2l7 3v6c0 5-3.5 8.4-7 9.9C8.5 19.4 5 16 5 11V5l7-3zM12 7a2.75 2.75 0 110 5.5A2.75 2.75 0 0112 7zm0 6.5c-2.8 0-5 1.6-5 3.5v1.2c1.7 1.1 3.5 2 5 2.6 1.5-.6 3.3-1.5 5-2.6V17c0-1.9-2.2-3.5-5-3.5z"/>
          </svg>
        </div>
        <div>
          <div className="text-xs opacity-90 tracking-[0.18em] uppercase">Underwriting Workbench</div>
          <div className="font-extrabold">{title}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex gap-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`px-3 py-2 rounded-lg font-bold cursor-pointer transition-colors ${
              location.pathname === item.href
                ? 'bg-white text-brand'
                : 'bg-white/[0.14] text-white hover:bg-white/20'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Profile */}
      <div className="flex items-center gap-2.5 bg-white/[0.14] border border-white/[0.24] rounded-full px-2.5 py-1.5">
        <div className="w-8.5 h-8.5 rounded-full bg-white grid place-items-center text-brand font-black">
          {getInitials(user?.fullName || 'User')}
        </div>
        <div>
          <div className="font-bold text-sm">{user?.fullName || 'User'}</div>
          <div className="text-xs opacity-85">{user?.role || 'Underwriter'}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
