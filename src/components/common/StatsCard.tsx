import React, { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: string;
    positive: boolean;
  };
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title,
  value,
  icon,
  change,
  color = 'primary'
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'primary': return 'text-primary-500 bg-primary-900/30';
      case 'secondary': return 'text-secondary-500 bg-secondary-900/30';
      case 'success': return 'text-green-500 bg-green-900/30';
      case 'warning': return 'text-yellow-500 bg-yellow-900/30';
      case 'danger': return 'text-red-500 bg-red-900/30';
      default: return 'text-primary-500 bg-primary-900/30';
    }
  };

  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-white">{value}</p>
            {change && (
              <span className={`ml-2 text-xs font-medium ${change.positive ? 'text-green-400' : 'text-red-400'}`}>
                {change.positive ? '↑' : '↓'} {change.value}
              </span>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-lg ${getColorClass()}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;