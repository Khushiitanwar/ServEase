import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!currentUser) return '/login';
    
    switch (currentUser.role) {
      case 'customer':
        return '/customer-dashboard';
      case 'service_provider':
        return '/service-provider-dashboard';
      case 'delivery_partner':
        return '/delivery-partner-dashboard';
      case 'admin':
        return '/admin-dashboard';
      default:
        return '/';
    }
  };

  return (
    <nav className="bg-dark-200 border-b border-dark-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-primary-500 p-1 rounded-md bg-primary-900">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-6 h-6"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <span className="text-white font-bold text-xl">ServEase</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="navbar-link">Home</Link>
              <Link to="/about" className="navbar-link">About</Link>
              <Link to="/contact" className="navbar-link">Contact</Link>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to={getDashboardLink()} className="navbar-link">Dashboard</Link>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-300 text-sm">
                      {currentUser?.fullName} ({currentUser?.role.replace('_', ' ')})
                    </span>
                    <button 
                      onClick={handleLogout}
                      className="text-gray-300 hover:text-primary-400 transition-colors"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login" className="btn-outline text-sm py-1.5">Log In</Link>
                  <Link to="/signup" className="btn-primary text-sm py-1.5">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="bg-dark-200 p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-200 pb-3 px-2 pt-2 animate-fade-in">
          <div className="flex flex-col space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-dark-100 hover:text-white"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-dark-100 hover:text-white"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-dark-100 hover:text-white"
              onClick={closeMenu}
            >
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to={getDashboardLink()} 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-dark-100 hover:text-white"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <div className="border-t border-dark-100 pt-2 mt-2">
                  <div className="flex items-center px-3 py-2">
                    <User size={16} className="text-gray-400 mr-2" />
                    <span className="text-gray-300 text-sm">
                      {currentUser?.fullName} ({currentUser?.role.replace('_', ' ')})
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-dark-100 hover:text-white"
                  >
                    <LogOut size={16} className="mr-2" />
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-1 pt-2 mt-2 border-t border-dark-100">
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-dark-100 hover:text-white"
                  onClick={closeMenu}
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 rounded-md bg-primary-600 text-white text-base font-medium"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;