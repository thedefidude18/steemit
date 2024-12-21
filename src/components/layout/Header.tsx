import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, PenSquare, Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Steemit
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/trending" className="text-gray-600 hover:text-blue-600">
              Trending
            </Link>
            <Link to="/hot" className="text-gray-600 hover:text-blue-600">
              Hot
            </Link>
            <Link to="/new" className="text-gray-600 hover:text-blue-600">
              New
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {isAuthenticated ? (
              <>
                <Link
                  to="/create"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <PenSquare className="h-5 w-5" />
                  <span>Write</span>
                </Link>
                <Link
                  to={`/@${user?.username}`}
                  className="flex items-center space-x-2"
                >
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
                    alt="avatar"
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="font-medium">{user?.username}</span>
                </Link>
              </>
            ) : (
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/trending"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Trending
            </Link>
            <Link
              to="/hot"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Hot
            </Link>
            <Link
              to="/new"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              New
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}