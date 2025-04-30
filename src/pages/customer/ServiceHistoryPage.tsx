import React from 'react';
import DashboardLayout from '../../components/common/DashboardLayout';
import DashboardHeader from '../../components/common/DashboardHeader';
import ServiceHistory from '../../components/customer/ServiceHistory';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const ServiceHistoryPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { getUserRequests } = useData();
  
  const userRequests = currentUser ? getUserRequests(currentUser.id) : [];

  React.useEffect(() => {
    // Update the document title
    document.title = 'Service History - ServEase';
  }, []);
  
  return (
    <DashboardLayout requiredRole="customer">
      <DashboardHeader 
        title="Service History" 
        subtitle="View all your past and current service requests" 
      />
      
      <div className="p-6">
        <ServiceHistory requests={userRequests} />
      </div>
    </DashboardLayout>
  );
};

export default ServiceHistoryPage;