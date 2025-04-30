import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import DashboardSidebar from './DashboardSidebar';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface DashboardLayoutProps {
  children: ReactNode;
  requiredRole: UserRole;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, requiredRole }) => {
  const { currentUser, isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-300">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (!isAuthenticated || currentUser?.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-dark-300">
      <Navbar />
      <div className="flex">
        <DashboardSidebar role={requiredRole} />
        <div className="ml-64 flex-1 flex flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;