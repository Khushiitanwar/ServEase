import React, { useState } from 'react';
import DashboardLayout from '../../components/common/DashboardLayout';
import DashboardHeader from '../../components/common/DashboardHeader';
import UsersList from '../../components/admin/UsersList';
import { useData } from '../../context/DataContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { User, UserRole } from '../../types';
import { Users } from 'lucide-react';

const UsersManagementPage: React.FC = () => {
  const { getUsersWithRole } = useData();
  const [users, setUsers] = useLocalStorage<User[]>('users', []);
  const [activeTab, setActiveTab] = useState<UserRole | 'all'>('all');
  
  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };
  
  const getUsersForActiveTab = () => {
    if (activeTab === 'all') {
      return users;
    }
    return getUsersWithRole(activeTab);
  };
  
  const tabs = [
    { id: 'all', label: 'All Users' },
    { id: 'customer', label: 'Customers' },
    { id: 'service_provider', label: 'Service Providers' },
    { id: 'delivery_partner', label: 'Delivery Partners' },
    { id: 'admin', label: 'Admins' },
  ];

  React.useEffect(() => {
    // Update the document title
    document.title = 'User Management - ServEase';
  }, []);
  
  return (
    <DashboardLayout requiredRole="admin">
      <DashboardHeader 
        title="User Management" 
        subtitle="Manage platform users" 
      />
      
      <div className="p-6">
        {/* Role Tabs */}
        <div className="border-b border-dark-100 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab whitespace-nowrap ${
                  activeTab === tab.id ? 'tab-active' : ''
                }`}
                onClick={() => setActiveTab(tab.id as UserRole | 'all')}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Users List */}
        <div className="card p-6">
          {users.length > 0 ? (
            <UsersList 
              users={getUsersForActiveTab()} 
              role={activeTab === 'all' ? undefined : activeTab}
              onDelete={handleDeleteUser}
            />
          ) : (
            <div className="py-12 text-center">
              <Users className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-300 mb-2">No Users Found</h3>
              <p className="text-gray-400">There are no users registered on the platform yet.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsersManagementPage;