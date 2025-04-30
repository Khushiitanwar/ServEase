import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, PenTool as Tool, Truck, ShieldCheck, Settings, Package, History, Clock, CreditCard, MessageSquare, Bell, Map, DollarSign, Users, AlertCircle } from 'lucide-react';
import { UserRole } from '../../types';

interface DashboardSidebarProps {
  role: UserRole;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ role }) => {
  const getLinksByRole = () => {
    switch (role) {
      case 'customer':
        return [
          { to: '/customer-dashboard', icon: <Home size={20} />, label: 'Dashboard' },
          { to: '/customer-dashboard/request-service', icon: <Tool size={20} />, label: 'Request Service' },
          { to: '/customer-dashboard/track-order', icon: <Package size={20} />, label: 'Track Order' },
          { to: '/customer-dashboard/service-history', icon: <History size={20} />, label: 'Service History' },
          { to: '/customer-dashboard/payments', icon: <CreditCard size={20} />, label: 'Payments' },
          { to: '/customer-dashboard/complaints', icon: <MessageSquare size={20} />, label: 'Complaints' },
        ];
      case 'service_provider':
        return [
          { to: '/service-provider-dashboard', icon: <Home size={20} />, label: 'Dashboard' },
          { to: '/service-provider-dashboard/repair-requests', icon: <Tool size={20} />, label: 'Repair Requests' },
          { to: '/service-provider-dashboard/scheduled', icon: <Clock size={20} />, label: 'Scheduled Repairs' },
          { to: '/service-provider-dashboard/completed', icon: <History size={20} />, label: 'Completed Repairs' },
          { to: '/service-provider-dashboard/payments', icon: <CreditCard size={20} />, label: 'Payments' },
          { to: '/service-provider-dashboard/feedback', icon: <MessageSquare size={20} />, label: 'Feedback' },
        ];
      case 'delivery_partner':
        return [
          { to: '/delivery-partner-dashboard', icon: <Home size={20} />, label: 'Dashboard' },
          { to: '/delivery-partner-dashboard/pickup-requests', icon: <Package size={20} />, label: 'Pickup Requests' },
          { to: '/delivery-partner-dashboard/active-deliveries', icon: <Truck size={20} />, label: 'Active Deliveries' },
          { to: '/delivery-partner-dashboard/tracking', icon: <Map size={20} />, label: 'Live Tracking' },
          { to: '/delivery-partner-dashboard/earnings', icon: <DollarSign size={20} />, label: 'Earnings' },
          { to: '/delivery-partner-dashboard/delivery-history', icon: <History size={20} />, label: 'Delivery History' },
        ];
      case 'admin':
        return [
          { to: '/admin-dashboard', icon: <Home size={20} />, label: 'Dashboard' },
          { to: '/admin-dashboard/users', icon: <Users size={20} />, label: 'Manage Users' },
          { to: '/admin-dashboard/service-providers', icon: <Tool size={20} />, label: 'Service Providers' },
          { to: '/admin-dashboard/delivery-partners', icon: <Truck size={20} />, label: 'Delivery Partners' },
          { to: '/admin-dashboard/requests', icon: <Package size={20} />, label: 'Service Requests' },
          { to: '/admin-dashboard/support', icon: <MessageSquare size={20} />, label: 'Support Tickets' },
          { to: '/admin-dashboard/complaints', icon: <AlertCircle size={20} />, label: 'Complaints' },
          { to: '/admin-dashboard/transactions', icon: <CreditCard size={20} />, label: 'Transactions' },
          { to: '/admin-dashboard/analytics', icon: <ShieldCheck size={20} />, label: 'Analytics' },
        ];
      default:
        return [];
    }
  };

  const links = getLinksByRole();

  return (
    <div className="bg-dark-200 h-full min-h-screen w-64 fixed left-0 top-16 border-r border-dark-100 overflow-y-auto pb-20">
      <div className="px-4 py-6">
        <div className="flex items-center space-x-2 px-2 mb-6">
          <User size={20} className="text-primary-400" />
          <h2 className="text-lg font-medium text-gray-200 capitalize">{role.replace('_', ' ')} Portal</h2>
        </div>
        
        <nav className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 
                isActive 
                  ? "sidebar-link sidebar-link-active" 
                  : "sidebar-link"
              }
              end={link.to.endsWith('dashboard')}
            >
              <span className="mr-3 text-gray-400">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-8 pt-6 border-t border-dark-100">
          <NavLink
            to={`/${role}-dashboard/profile`}
            className={({ isActive }) => 
              isActive 
                ? "sidebar-link sidebar-link-active" 
                : "sidebar-link"
            }
          >
            <span className="mr-3 text-gray-400"><User size={20} /></span>
            Profile
          </NavLink>
          <NavLink
            to={`/${role}-dashboard/settings`}
            className={({ isActive }) => 
              isActive 
                ? "sidebar-link sidebar-link-active" 
                : "sidebar-link"
            }
          >
            <span className="mr-3 text-gray-400"><Settings size={20} /></span>
            Settings
          </NavLink>
          <NavLink
            to={`/${role}-dashboard/notifications`}
            className={({ isActive }) => 
              isActive 
                ? "sidebar-link sidebar-link-active" 
                : "sidebar-link"
            }
          >
            <span className="mr-3 text-gray-400"><Bell size={20} /></span>
            Notifications
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;