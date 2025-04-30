import React from 'react';
import DashboardLayout from '../../components/common/DashboardLayout';
import DashboardHeader from '../../components/common/DashboardHeader';
import DashboardStats from '../../components/admin/DashboardStats';
import AnalyticsCharts from '../../components/admin/AnalyticsCharts';
import UsersList from '../../components/admin/UsersList';
import ComplaintsList from '../../components/admin/ComplaintsList';
import { useData } from '../../context/DataContext';

const AdminDashboardPage: React.FC = () => {
  const { platformStats, complaints, respondToComplaint, getUsersWithRole } = useData();
  
  // Get most recent users (up to 5)
  const recentUsers = getUsersWithRole('customer').slice(0, 5);
  
  // Get open complaints (up to 5)
  const openComplaints = complaints
    .filter(c => c.status === 'open')
    .slice(0, 5);
  
  const handleRespondToComplaint = async (complaintId: string, response: string) => {
    await respondToComplaint(complaintId, response);
  };

  React.useEffect(() => {
    // Update the document title
    document.title = 'Admin Dashboard - ServEase';
  }, []);
  
  return (
    <DashboardLayout requiredRole="admin">
      <DashboardHeader 
        title="Admin Dashboard" 
        subtitle="Platform overview and management" 
      />
      
      <div className="p-6">
        {/* Platform Stats */}
        <h2 className="text-xl font-semibold text-white mb-4">Platform Overview</h2>
        <DashboardStats stats={platformStats} />
        
        {/* Analytics Charts */}
        <AnalyticsCharts />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Recent Users */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium text-white">Recent Users</h3>
              <button className="text-sm text-primary-400 hover:text-primary-300">
                View All
              </button>
            </div>
            <UsersList users={recentUsers} />
          </div>
          
          {/* Open Complaints */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium text-white">Open Complaints</h3>
              <button className="text-sm text-primary-400 hover:text-primary-300">
                View All
              </button>
            </div>
            <ComplaintsList 
              complaints={openComplaints}
              onRespond={handleRespondToComplaint}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboardPage;