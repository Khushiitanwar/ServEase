import React, { useState } from 'react';
import DashboardLayout from '../../components/common/DashboardLayout';
import DashboardHeader from '../../components/common/DashboardHeader';
import OrderTracking from '../../components/customer/OrderTracking';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { RepairRequest } from '../../types';
import { Package, Search } from 'lucide-react';

const TrackOrderPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { getUserRequests } = useData();
  
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const userRequests = currentUser ? getUserRequests(currentUser.id) : [];
  
  // Filter active requests (not completed or cancelled)
  const activeRequests = userRequests.filter(req => 
    !['completed', 'cancelled'].includes(req.status)
  );
  
  // Sort by most recent first
  const sortedRequests = [...activeRequests].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  const filteredRequests = searchTerm 
    ? sortedRequests.filter(req => 
        req.applianceType.includes(searchTerm.toLowerCase()) ||
        req.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.id.includes(searchTerm)
      )
    : sortedRequests;
  
  // Get the selected request details
  const selectedRequest = selectedRequestId 
    ? userRequests.find(req => req.id === selectedRequestId)
    : filteredRequests[0]; // Default to the first request if none selected

  React.useEffect(() => {
    // Update the document title
    document.title = 'Track Order - ServEase';
  }, []);
  
  const handleRequestSelect = (request: RepairRequest) => {
    setSelectedRequestId(request.id);
  };
  
  return (
    <DashboardLayout requiredRole="customer">
      <DashboardHeader 
        title="Track Order" 
        subtitle="Monitor the status of your repair requests" 
      />
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Requests List */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search requests..."
                    className="input-field pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-white mb-3">Your Requests</h3>
              
              {filteredRequests.length > 0 ? (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {filteredRequests.map(request => (
                    <div 
                      key={request.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedRequest?.id === request.id
                          ? 'bg-primary-900/30 border border-primary-700'
                          : 'bg-dark-100 border border-dark-100 hover:border-gray-700'
                      }`}
                      onClick={() => handleRequestSelect(request)}
                    >
                      <div className="flex items-start">
                        <div className="mr-3 p-1.5 bg-primary-900/50 rounded-md">
                          <Package className="h-4 w-4 text-primary-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">
                            {request.applianceType.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                          </h4>
                          <p className="text-xs text-gray-400 mt-0.5">{request.brand}</p>
                          <div className="flex items-center mt-2">
                            <span className={`
                              px-1.5 py-0.5 rounded-full text-[10px] font-medium
                              ${request.status === 'pending' ? 'bg-yellow-900 text-yellow-200' : ''}
                              ${['accepted', 'in_repair', 'repaired', 'pickup_scheduled', 'in_transit'].includes(request.status) ? 'bg-blue-900 text-blue-200' : ''}
                              ${request.status === 'completed' ? 'bg-green-900 text-green-200' : ''}
                              ${request.status === 'cancelled' ? 'bg-red-900 text-red-200' : ''}
                            `}>
                              {request.status.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}
                            </span>
                            <span className="text-xs text-gray-500 ml-2">
                              {new Date(request.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">No active requests found</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Tracking Details */}
          <div className="lg:col-span-2">
            {selectedRequest ? (
              <OrderTracking 
                currentStatus={selectedRequest.status}
                assignedShop={selectedRequest.assignedShopName || undefined}
                createdAt={new Date(selectedRequest.createdAt)}
                updatedAt={new Date(selectedRequest.updatedAt)}
              />
            ) : (
              <div className="card p-8 text-center">
                <Package className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-300 mb-2">No Request Selected</h3>
                <p className="text-gray-400">
                  {filteredRequests.length > 0
                    ? 'Select a request from the list to view its tracking details'
                    : 'You have no active repair requests to track'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TrackOrderPage;