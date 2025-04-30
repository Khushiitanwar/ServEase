import React from 'react';
import { Package, Clock, CheckCircle, PenTool as Tool, DollarSign } from 'lucide-react';
import DashboardLayout from '../../components/common/DashboardLayout';
import DashboardHeader from '../../components/common/DashboardHeader';
import StatsCard from '../../components/common/StatsCard';
import RepairRequestList from '../../components/service-provider/RepairRequestList';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

const ServiceProviderDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { repairRequests, updateRequestStatus } = useData();
  
  // For demo purposes, service providers can see all requests
  // In a real app, they would only see requests assigned to them
  const pendingRequests = repairRequests.filter(req => req.status === 'pending');
  const acceptedRequests = repairRequests.filter(req => 
    req.assignedShopId === currentUser?.id && 
    ['accepted', 'in_repair', 'repaired'].includes(req.status)
  );
  const completedRequests = repairRequests.filter(req => 
    req.assignedShopId === currentUser?.id && 
    ['completed'].includes(req.status)
  );
  
  // Calculate total earnings (mock data)
  const totalEarnings = completedRequests.length * 120; // Assume $120 per completed repair
  
  const handleAcceptRequest = async (requestId: string) => {
    // In a real app, this would be the shop's ID
    // For demo purposes, we'll use the current user's ID
    if (currentUser) {
      await updateRequestStatus(requestId, 'accepted', currentUser.id, currentUser.fullName);
    }
  };
  
  const handleRejectRequest = async (requestId: string) => {
    await updateRequestStatus(requestId, 'cancelled');
  };
  
  const handleUpdateStatus = async (requestId: string, status: string) => {
    await updateRequestStatus(requestId, status);
  };

  React.useEffect(() => {
    // Update the document title
    document.title = 'Service Provider Dashboard - ServEase';
  }, []);
  
  return (
    <DashboardLayout requiredRole="service_provider">
      <DashboardHeader 
        title="Service Provider Dashboard" 
        subtitle={`Welcome back, ${currentUser?.fullName}`} 
      />
      
      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="New Requests"
            value={pendingRequests.length.toString()}
            icon={<Package size={20} />}
            color="primary"
          />
          <StatsCard
            title="In Progress"
            value={acceptedRequests.length.toString()}
            icon={<Tool size={20} />}
            color="secondary"
          />
          <StatsCard
            title="Completed"
            value={completedRequests.length.toString()}
            icon={<CheckCircle size={20} />}
            color="success"
          />
          <StatsCard
            title="Total Earnings"
            value={`$${totalEarnings.toFixed(2)}`}
            icon={<DollarSign size={20} />}
            color="primary"
          />
        </div>
        
        {/* New Repair Requests */}
        <h2 className="text-xl font-semibold text-white mb-4">New Repair Requests</h2>
        <RepairRequestList 
          requests={pendingRequests}
          onAccept={handleAcceptRequest}
          onReject={handleRejectRequest}
        />
        
        {/* Active Repairs */}
        <h2 className="text-xl font-semibold text-white mt-10 mb-4">Active Repairs</h2>
        <RepairRequestList 
          requests={acceptedRequests}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>
    </DashboardLayout>
  );
};

export default ServiceProviderDashboardPage;