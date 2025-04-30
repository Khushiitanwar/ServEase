import React from 'react';
import { RepairRequest } from '../../types';
import StatusBadge from '../common/StatusBadge';
import { Calendar, Clock, MapPin, PenTool as Tool } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

interface RepairRequestListProps {
  requests: RepairRequest[];
  onAccept?: (requestId: string) => void;
  onReject?: (requestId: string) => void;
  onUpdateStatus?: (requestId: string, status: string) => void;
  showControls?: boolean;
}

const RepairRequestList: React.FC<RepairRequestListProps> = ({ 
  requests,
  onAccept,
  onReject,
  onUpdateStatus,
  showControls = true
}) => {
  // Sort requests by date (newest first)
  const sortedRequests = [...requests].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (sortedRequests.length === 0) {
    return (
      <div className="bg-dark-200 rounded-lg p-8 text-center border border-dashed border-dark-100">
        <Clock className="h-12 w-12 text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-300 mb-2">No Repair Requests</h3>
        <p className="text-gray-400 mb-4">There are no repair requests at the moment.</p>
      </div>
    );
  }

  const getStatusUpdateOptions = (status: string) => {
    switch (status) {
      case 'accepted':
        return ['in_repair'];
      case 'in_repair':
        return ['repaired'];
      case 'repaired':
        return ['pickup_scheduled'];
      default:
        return [];
    }
  };

  const formatStatusOption = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <div className="space-y-6">
      {sortedRequests.map((request) => (
        <div key={request.id} className="card p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div className="flex items-center mb-2 md:mb-0">
              <div className="mr-3 p-2 bg-primary-900/50 rounded-md">
                <Tool className="h-5 w-5 text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">
                  {request.applianceType.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())} Repair
                </h3>
                <p className="text-sm text-gray-400">{request.brand}</p>
              </div>
            </div>
            <StatusBadge status={request.status} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
            <div className="flex items-start">
              <Calendar className="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-gray-400">Created On</p>
                <p className="text-gray-200">{formatDate(request.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-gray-400">Preferred Schedule</p>
                <p className="text-gray-200">{formatDate(request.preferredDateTime)}</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="text-gray-400">Pickup Address</p>
                <p className="text-gray-200">{request.address}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 border-t border-dark-100 pt-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-400 mb-1">Customer:</p>
                <p className="text-gray-300">{request.customerName} ({request.customerPhone})</p>
              </div>
              
              {showControls && (
                <div className="flex flex-wrap gap-2">
                  {request.status === 'pending' && onAccept && onReject && (
                    <>
                      <button 
                        onClick={() => onAccept(request.id)}
                        className="btn-primary text-sm"
                      >
                        Accept Request
                      </button>
                      <button 
                        onClick={() => onReject(request.id)}
                        className="btn-danger text-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  
                  {onUpdateStatus && getStatusUpdateOptions(request.status).length > 0 && (
                    <div className="flex items-center space-x-2">
                      <select 
                        className="select-field text-sm py-1.5"
                        onChange={(e) => {
                          if (e.target.value) {
                            onUpdateStatus(request.id, e.target.value);
                          }
                        }}
                        defaultValue=""
                      >
                        <option value="" disabled>Update Status</option>
                        {getStatusUpdateOptions(request.status).map((status) => (
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
            <p className="text-sm text-gray-400 mb-1">Issue Description:</p>
            <p className="text-gray-300">{request.issueDescription}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepairRequestList;