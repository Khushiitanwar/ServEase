import React from 'react';
import { Users, PenTool as Tool, Truck, DollarSign, ShoppingBag, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { PlatformStats } from '../../types';
import StatsCard from '../common/StatsCard';

interface DashboardStatsProps {
  stats: PlatformStats;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatsCard
        title="Total Users"
        value={stats.totalUsers}
        icon={<Users size={20} />}
        color="primary"
      />
      
      <StatsCard
        title="Service Providers"
        value={stats.totalServiceProviders}
        icon={<Tool size={20} />}
        color="secondary"
      />
      
      <StatsCard
        title="Delivery Partners"
        value={stats.totalDeliveryPartners}
        icon={<Truck size={20} />}
        color="primary"
      />
      
      <StatsCard
        title="Total Earnings"
        value={`$${stats.totalEarnings.toFixed(2)}`}
        icon={<DollarSign size={20} />}
        color="success"
      />
      
      <StatsCard
        title="Total Requests"
        value={stats.totalRequests}
        icon={<ShoppingBag size={20} />}
        color="primary"
      />
      
      <StatsCard
        title="Pending Requests"
        value={stats.pendingRequests}
        icon={<Clock size={20} />}
        color="warning"
      />
      
      <StatsCard
        title="Active Requests"
        value={stats.activeRequests}
        icon={<AlertCircle size={20} />}
        color="primary"
      />
      
      <StatsCard
        title="Completed Requests"
        value={stats.completedRequests}
        icon={<CheckCircle size={20} />}
        color="success"
      />
    </div>
  );
};

export default DashboardStats;