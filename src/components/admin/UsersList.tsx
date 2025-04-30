import React from 'react';
import { User, UserRole } from '../../types';
import DataTable from '../common/DataTable';
import { Calendar, User as UserIcon } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

interface UsersListProps {
  users: User[];
  role?: UserRole;
  onDelete?: (userId: string) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, role, onDelete }) => {
  // Filter users by role if specified
  const filteredUsers = role ? users.filter(user => user.role === role) : users;

  // Sort users by creation date (newest first)
  const sortedUsers = [...filteredUsers].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const formatRole = (role: string) => {
    return role.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  const columns = [
    {
      header: 'User',
      accessor: (user: User) => (
        <div className="flex items-center">
          <div className="bg-primary-800 text-primary-200 rounded-full w-8 h-8 flex items-center justify-center mr-3">
            <UserIcon size={16} />
          </div>
          <div>
            <p className="font-medium text-white">{user.fullName}</p>
            <p className="text-gray-400 text-xs">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Role',
      accessor: (user: User) => (
        <span className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${user.role === 'admin' ? 'bg-purple-900 text-purple-200' : ''}
          ${user.role === 'customer' ? 'bg-blue-900 text-blue-200' : ''}
          ${user.role === 'service_provider' ? 'bg-green-900 text-green-200' : ''}
          ${user.role === 'delivery_partner' ? 'bg-orange-900 text-orange-200' : ''}
        `}>
          {formatRole(user.role)}
        </span>
      ),
    },
    {
      header: 'Contact',
      accessor: (user: User) => (
        <div>
          <p className="text-gray-300">{user.phone}</p>
          <p className="text-gray-400 text-xs">{user.city}</p>
        </div>
      ),
    },
    {
      header: 'Joined',
      accessor: (user: User) => (
        <div className="flex items-center text-gray-300">
          <Calendar size={14} className="mr-1.5 text-gray-400" />
          {formatDate(user.createdAt)}
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: (user: User) => (
        <div className="flex space-x-2">
          <button className="px-2 py-1 bg-dark-100 text-gray-300 rounded-md text-xs hover:bg-dark-200 transition-colors">
            View
          </button>
          {onDelete && user.role !== 'admin' && (
            <button 
              onClick={() => onDelete(user.id)}
              className="px-2 py-1 bg-red-900/30 text-red-300 rounded-md text-xs hover:bg-red-900/50 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={sortedUsers}
      columns={columns}
      keyExtractor={(user) => user.id}
      emptyMessage={`No ${role ? formatRole(role) + 's' : 'users'} found`}
    />
  );
};

export default UsersList;