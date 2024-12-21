import { Home, Compass, Bell, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Footer() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <footer className="fixed bottom-0 w-full bg-white border-t md:hidden">
      <nav className="flex justify-around py-2">
        <Link
          to="/"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          to="/explore"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/explore') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Compass className="h-6 w-6" />
          <span className="text-xs">Explore</span>
        </Link>
        <Link
          to="/notifications"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/notifications') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <Bell className="h-6 w-6" />
          <span className="text-xs">Notifications</span>
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/profile') ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <User className="h-6 w-6" />
          <span className="text-xs">Profile</span>
        </Link>
      </nav>
    </footer>
  );
}