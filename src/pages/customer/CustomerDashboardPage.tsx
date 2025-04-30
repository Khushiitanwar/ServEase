import React from 'react';
import { Package, Clock, History, PenTool as Tool, CheckCircle } from 'lucide-react';
import DashboardLayout from '../../components/common/DashboardLayout';
import DashboardHeader from '../../components/common/DashboardHeader';
import StatsCard from '../../components/common/StatsCard';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

const CustomerDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { repairRequests, getUserRequests } = useData();
  
  const userRequests = currentUser ? getUserRequests(currentUser.id) : [];
  
  // Count requests by status
  const pendingRequests = userRequests.filter(req => req.status === 'pending').length;
  const inProgressRequests = userRequests.filter(req => 
    ['accepted', 'in_repair', 'repaired', 'pickup_scheduled', 'in_transit'].includes(req.status)
  ).length;
  const completedRequests = userRequests.filter(req => req.status === 'completed').length;
  const cancelledRequests = userRequests.filter(req => req.status === 'cancelled').length;
  
  // Get most recent requests (up to 3)
  const recentRequests = [...userRequests]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  React.useEffect(() => {
    // Update the document title
    document.title = 'Customer Dashboard - ServEase';
  }, []);

  return (
    <DashboardLayout requiredRole="customer">
      <DashboardHeader 
        title="Customer Dashboard" 
        subtitle={`Welcome back, ${currentUser?.fullName}`} 
      />
      
      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Requests"
            value={userRequests.length.toString()}
            icon={<Package size={20} />}
            color="primary"
          />
          <StatsCard
            title="Pending"
            value={pendingRequests.toString()}
            icon={<Clock size={20} />}
            color="warning"
          />
          <StatsCard
            title="In Progress"
            value={inProgressRequests.toString()}
            icon={<Tool size={20} />}
            color="primary"
          />
          <StatsCard
            title="Completed"
            value={completedRequests.toString()}
            icon={<CheckCircle size={20} />}
            color="success"
          />
        </div>
        
        {/* Quick Actions */}
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link to="/customer-dashboard/request-service" className="card-gradient p-5 hover:bg-dark-100 transition-colors cursor-pointer">
            <h3 className="text-lg font-medium text-white mb-2">Request Service</h3>
            <p className="text-gray-400 text-sm">Submit a new appliance repair request</p>
          </Link>
          <Link to="/customer-dashboard/track-order" className="card-gradient p-5 hover:bg-dark-100 transition-colors cursor-pointer">
            <h3 className="text-lg font-medium text-white mb-2">Track Order</h3>
            <p className="text-gray-400 text-sm">Check the status of your repair requests</p>
          </Link>
          <Link to="/customer-dashboard/service-history" className="card-gradient p-5 hover:bg-dark-100 transition-colors cursor-pointer">
            <h3 className="text-lg font-medium text-white mb-2">Service History</h3>
            <p className="text-gray-400 text-sm">View your past service requests</p>
          </Link>
        </div>
        
        {/* Recent Requests */}
        <h2 className="text-xl font-semibold text-white mb-4">Recent Requests</h2>
        {recentRequests.length > 0 ? (
          <div className="space-y-4">
            {recentRequests.map(request => (
              <div key={request.id} className="card p-5 flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="mb-4 lg:mb-0">
                  <h3 className="font-medium text-white">{request.applianceType.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())} Repair</h3>
                  <p className="text-gray-400 text-sm">{request.brand} - Created on {new Date(request.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${request.status === 'pending' ? 'bg-yellow-900 text-yellow-200' : ''}
                    ${['accepted', 'in_repair', 'repaired', 'pickup_scheduled', 'in_transit'].includes(request.status) ? 'bg-blue-900 text-blue-200' : ''}
                    ${request.status === 'completed' ? 'bg-green-900 text-green-200' : ''}
                    ${request.status === 'cancelled' ? 'bg-red-900 text-red-200' : ''}
                  `}>
                    {formatStatus(request.status)}
                  </span>
                  <Link to="/customer-dashboard/track-order" className="btn-outline text-sm py-1 px-3">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-6 text-center">
            <Package className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-300 mb-2">No Requests Yet</h3>
            <p className="text-gray-400 mb-4">You haven't made any repair requests yet.</p>
            <Link to="/customer-dashboard/request-service" className="btn-primary inline-block">
              Request Service Now
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboardPage;