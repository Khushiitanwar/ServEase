import React from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { RequestStatus } from '../../types';

interface OrderTrackingProps {
  currentStatus: RequestStatus;
  assignedShop?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ 
  currentStatus, 
  assignedShop, 
  createdAt, 
  updatedAt 
}) => {
  const statuses: RequestStatus[] = [
    'pending',
    'accepted',
    'in_repair',
    'repaired',
    'pickup_scheduled',
    'in_transit',
    'delivered',
    'completed'
  ];

  const getStatusIndex = (status: RequestStatus): number => {
    return statuses.indexOf(status);
  };

  const currentStep = getStatusIndex(currentStatus);

  const stepInfo = [
    {
      name: 'Request Submitted',
      icon: <Package />,
      description: 'Your repair request has been submitted successfully.',
      date: createdAt
    },
    {
      name: 'Request Accepted',
      icon: <CheckCircle />,
      description: assignedShop ? `Your request has been accepted by ${assignedShop}.` : 'Your request has been accepted by a service provider.',
      date: currentStep >= 1 ? updatedAt : null
    },
    {
      name: 'In Repair',
      icon: <Tool />,
      description: 'Your appliance is currently being repaired.',
      date: currentStep >= 2 ? updatedAt : null
    },
    {
      name: 'Repaired',
      icon: <CheckCircle />,
      description: 'Your appliance has been successfully repaired.',
      date: currentStep >= 3 ? updatedAt : null
    },
    {
      name: 'Pickup Scheduled',
      icon: <Calendar />,
      description: 'A delivery partner has been assigned to pick up your repaired appliance.',
      date: currentStep >= 4 ? updatedAt : null
    },
    {
      name: 'In Transit',
      icon: <Truck />,
      description: 'Your appliance is on its way back to you.',
      date: currentStep >= 5 ? updatedAt : null
    },
    {
      name: 'Delivered',
      icon: <Home />,
      description: 'Your appliance has been delivered to your address.',
      date: currentStep >= 6 ? updatedAt : null
    },
    {
      name: 'Completed',
      icon: <CheckCircle />,
      description: 'Service completed successfully. Thank you for using ServEase!',
      date: currentStep >= 7 ? updatedAt : null
    }
  ];

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Date(date).toLocaleString();
  };

  if (currentStatus === 'cancelled') {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 text-center mb-8">
        <XCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-xl font-medium text-white mb-2">Request Cancelled</h3>
        <p className="text-gray-300">This repair request has been cancelled.</p>
        <p className="text-sm text-gray-400 mt-2">Cancelled on {formatDate(updatedAt)}</p>
      </div>
    );
  }

  return (
    <div className="card p-6 animate-fade-in">
      <h3 className="text-xl font-medium text-white mb-6">Order Status</h3>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-6 top-0 w-px bg-dark-100 h-full"></div>
        
        {/* Steps */}
        <div className="space-y-8">
          {stepInfo.map((step, index) => {
            const isCompleted = currentStep >= index;
            const isCurrent = currentStep === index;
            
            return (
              <div key={index} className="relative flex items-start">
                {/* Step Circle */}
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                  isCompleted 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-dark-100 text-gray-500'
                } ${
                  isCurrent ? 'ring-4 ring-primary-900' : ''
                }`}>
                  {step.icon}
                </div>
                
                {/* Step Content */}
                <div className="ml-4">
                  <div className="flex items-center">
                    <h4 className={`font-medium ${
                      isCompleted ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.name}
                    </h4>
                    {isCurrent && (
                      <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-900 text-primary-200">
                        Current
                      </span>
                    )}
                  </div>
                  
                  <p className="mt-1 text-sm text-gray-400">{step.description}</p>
                  
                  {step.date && (
                    <p className="mt-1 text-xs text-gray-500">
                      <Clock className="inline-block h-3 w-3 mr-1" />
                      {formatDate(step.date)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// These imports aren't available at the top level, so we define them here
const Tool = ({ className = '', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-tool ${className}`}
    {...props}
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const Calendar = ({ className = '', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-calendar ${className}`}
    {...props}
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const Home = ({ className = '', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-home ${className}`}
    {...props}
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const XCircle = ({ className = '', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-x-circle ${className}`}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

export default OrderTracking;