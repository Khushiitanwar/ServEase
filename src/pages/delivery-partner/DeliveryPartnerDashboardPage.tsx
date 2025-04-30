import React from 'react';
import { Package, Truck, Clock, CheckCircle, DollarSign } from 'lucide-react';
import DashboardLayout from '../../components/common/DashboardLayout';
import DashboardHeader from '../../components/common/DashboardHeader';
import StatsCard from '../../components/common/StatsCard';
import DeliveryJobsList from '../../components/delivery-partner/DeliveryJobsList';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

const DeliveryPartnerDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { deliveries, repairRequests, updateDeliveryStatus } = useData();
  
  // Available deliveries (not assigned to anyone)
  const availableDeliveries = deliveries.filter(d => !d.assignedPartnerId && d.deliveryStatus === 'pending');
  
  // My active deliveries
  const myActiveDeliveries = deliveries.filter(d => 
    d.assignedPartnerId === currentUser?.id && 
    ['pickup_scheduled', 'picked_up', 'in_transit'].includes(d.deliveryStatus)
  );
  
  // My completed deliveries
  const myCompletedDeliveries = deliveries.filter(d => 
    d.assignedPartnerId === currentUser?.id && 
    d.deliveryStatus === 'delivered'
  );
  
  // Calculate total earnings (mock data)
  const totalEarnings = myCompletedDeliveries.reduce((sum, d) => sum + d.deliveryFee, 0);
  
  const handleAcceptDelivery = async (deliveryId: string) => {
    if (currentUser) {
      await updateDeliveryStatus(
        deliveryId, 
        'pickup_scheduled', 
        currentUser.id, 
        currentUser.fullName
      );
    }
  };
  
  const handleUpdateStatus = async (deliveryId: string, status: string) => {
    await updateDeliveryStatus(deliveryId, status);
  };

  React.useEffect(() => {
    // Update the document title
    document.title = 'Delivery Partner Dashboard - ServEase';
  }, []);
  
  return (
    <DashboardLayout requiredRole="delivery_partner">
      <DashboardHeader 
        title="Delivery Partner Dashboard" 
        subtitle={`Welcome back, ${currentUser?.fullName}`} 
      />
      
      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Available Jobs"
            value={availableDeliveries.length.toString()}
            icon={<Package size={20} />}
            color="primary"
          />
          <StatsCard
            title="Active Deliveries"
            value={myActiveDeliveries.length.toString()}
            icon={<Truck size={20} />}
            color="secondary"
          />
          <StatsCard
            title="Completed"
            value={myCompletedDeliveries.length.toString()}
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
        
        {/* New Pickup Requests */}
        <h2 className="text-xl font-semibold text-white mb-4">Available Pickup Requests</h2>
        <DeliveryJobsList 
          deliveries={availableDeliveries}
          requests={repairRequests}
          onAccept={handleAcceptDelivery}
        />
        
        {/* Active Deliveries */}
        <h2 className="text-xl font-semibold text-white mt-10 mb-4">My Active Deliveries</h2>
        <DeliveryJobsList 
          deliveries={myActiveDeliveries}
          requests={repairRequests}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>
    </DashboardLayout>
  );
};

export default DeliveryPartnerDashboardPage;