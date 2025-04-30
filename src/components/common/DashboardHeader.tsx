import React from 'react';
import { User, Bell, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => {
  const { currentUser } = useAuth();

  return (
    <div className="py-6 px-6 border-b border-dark-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="bg-dark-100 text-gray-300 text-sm rounded-md px-4 py-2 pl-10 w-48 lg:w-64 border border-dark-100 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          
          <button className="relative text-gray-300 hover:text-primary-400 transition-colors">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="bg-primary-800 text-primary-200 rounded-full w-8 h-8 flex items-center justify-center">
              <User size={16} />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-white">{currentUser?.fullName}</p>
              <p className="text-xs text-gray-400 capitalize">{currentUser?.role.replace('_', ' ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;