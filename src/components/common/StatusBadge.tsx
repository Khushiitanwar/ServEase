import React from 'react';
import { RequestStatus, DeliveryStatus, PaymentStatus, ComplaintStatus } from '../../types';

interface StatusBadgeProps {
  status: RequestStatus | DeliveryStatus | PaymentStatus | ComplaintStatus;
  type?: 'request' | 'delivery' | 'payment' | 'complaint';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'request' }) => {
  const getStatusColor = () => {
    switch (type) {
      case 'request':
        switch (status) {
          case 'pending': return 'bg-yellow-900 text-yellow-200';
          case 'accepted': return 'bg-blue-900 text-blue-200';
          case 'in_repair': return 'bg-purple-900 text-purple-200';
          case 'repaired': return 'bg-blue-900 text-blue-200';
          case 'pickup_scheduled': return 'bg-indigo-900 text-indigo-200';
          case 'in_transit': return 'bg-blue-900 text-blue-200';
          case 'delivered': return 'bg-green-900 text-green-200';
          case 'completed': return 'bg-green-900 text-green-200';
          case 'cancelled': return 'bg-red-900 text-red-200';
          default: return 'bg-gray-900 text-gray-200';
        }
      case 'delivery':
        switch (status) {
          case 'pending': return 'bg-yellow-900 text-yellow-200';
          case 'pickup_scheduled': return 'bg-indigo-900 text-indigo-200';
          case 'picked_up': return 'bg-blue-900 text-blue-200';
          case 'in_transit': return 'bg-purple-900 text-purple-200';
          case 'delivered': return 'bg-green-900 text-green-200';
          default: return 'bg-gray-900 text-gray-200';
        }
      case 'payment':
        switch (status) {
          case 'pending': return 'bg-yellow-900 text-yellow-200';
          case 'paid': return 'bg-green-900 text-green-200';
          case 'refunded': return 'bg-blue-900 text-blue-200';
          case 'failed': return 'bg-red-900 text-red-200';
          default: return 'bg-gray-900 text-gray-200';
        }
      case 'complaint':
        switch (status) {
          case 'open': return 'bg-yellow-900 text-yellow-200';
          case 'in_review': return 'bg-blue-900 text-blue-200';
          case 'resolved': return 'bg-green-900 text-green-200';
          case 'closed': return 'bg-gray-900 text-gray-200';
          default: return 'bg-gray-900 text-gray-200';
        }
      default:
        return 'bg-gray-900 text-gray-200';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
      {formatStatus(status)}
    </span>
  );
};

export default StatusBadge;