import React from 'react';
import { Delivery, RepairRequest } from '../../types';
import StatusBadge from '../common/StatusBadge';
import { Calendar, Clock, MapPin, Package, User } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

interface DeliveryJobsListProps {
  deliveries: Delivery[];
  requests: RepairRequest[];
  onAccept?: (deliveryId: string) => void;
  onUpdateStatus?: (deliveryId: string, status: string) => void;
  showControls?: boolean;
}

const DeliveryJobsList: React.FC<DeliveryJobsListProps> = ({ 
  deliveries,
  requests,
  onAccept,
  onUpdateStatus,
  showControls = true
}) => {
  // Sort deliveries by date (newest first)
  const sortedDeliveries = [...deliveries].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Find corresponding request for each delivery
  const getRequestDetails = (requestId: string) => {
    return requests.find(req => req.id === requestId);
  };

  if (sortedDeliveries.length === 0) {
    return (
      <div className="bg-dark-200 rounded-lg p-8 text-center border border-dashed border-dark-100">
        <Package className="h-12 w-12 text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-300 mb-2">No Delivery Jobs</h3>
        <p className="text-gray-400 mb-4">There are no delivery jobs available at the moment.</p>
      </div>
    );
  }

  const getStatusUpdateOptions = (status: string) => {
    switch (status) {
      case 'pending':
        return ['pickup_scheduled'];
      case 'pickup_scheduled':
        return ['picked_up'];
      case 'picked_up':
        return ['in_transit'];
      case 'in_transit':
        return ['delivered'];
      default:
        return [];
    }
  };

  const formatStatusOption = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <div className="space-y-6">
      {sortedDeliveries.map((delivery) => {
        const request = getRequestDetails(delivery.requestId);
        
        if (!request) return null;
        
        return (
          <div key={delivery.id} className="card p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div className="flex items-center mb-2 md:mb-0">
                <div className="mr-3 p-2 bg-primary-900/50 rounded-md">
                  <Package className="h-5 w-5 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">
                    {request.applianceType.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())} Delivery
                  </h3>
                  <p className="text-sm text-gray-400">{request.brand}</p>
                </div>
              </div>
              <StatusBadge status={delivery.deliveryStatus} type="delivery" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
              <div className="flex items-start">
                <Calendar className="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Created On</p>
                  <p className="text-gray-200">{formatDate(delivery.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Pickup Time</p>
                  <p className="text-gray-200">
                    {delivery.pickupTime ? formatDate(delivery.pickupTime) : 'Not scheduled yet'}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Delivery Address</p>
                  <p className="text-gray-200">{request.address}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 border-t border-dark-100 pt-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="mb-4 md:mb-0 flex items-start">
                  <User className="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400">Customer:</p>
                    <p className="text-gray-300">{request.customerName} ({request.customerPhone})</p>
                  </div>
                </div>
                
                {showControls && (
                  <div className="flex flex-wrap gap-2">
                    {delivery.deliveryStatus === 'pending' && !delivery.assignedPartnerId && onAccept && (
                      <button 
                        onClick={() => onAccept(delivery.id)}
                        className="btn-primary text-sm"
                      >
                        Accept Delivery
                      </button>
                    )}
                    
                    {onUpdateStatus && delivery.assignedPartnerId && getStatusUpdateOptions(delivery.deliveryStatus).length > 0 && (
                      <div className="flex items-center space-x-2">
                        <select 
                          className="select-field text-sm py-1.5"
                          onChange={(e) => {
                            if (e.target.value) {
                              onUpdateStatus(delivery.id, e.target.value);
                            }
                          }}
                          defaultValue=""
                        >
                          <option value="" disabled>Update Status</option>
                          {getStatusUpdateOptions(delivery.deliveryStatus).map((status) => (
                            <option key={status} value={status}>
                              Mark as {formatStatusOption(status)}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 border-t border-dark-100 pt-4">
              <p className="text-sm text-gray-400 mb-1">Tracking Details:</p>
              <p className="text-gray-300">{delivery.trackingDetails}</p>
            </div>
            
            <div className="mt-4 border-t border-dark-100 pt-4">
              <p className="text-sm text-gray-400 mb-1">Service Provider:</p>
              <p className="text-gray-300">{request.assignedShopName || 'Not assigned yet'}</p>
            </div>
            
            <div className="mt-2 text-sm">
              <p className="text-gray-400">Delivery Fee: <span className="text-green-400">${delivery.deliveryFee.toFixed(2)}</span></p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DeliveryJobsList;