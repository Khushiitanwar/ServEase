import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from 'recharts';

const AnalyticsCharts: React.FC = () => {
  // Mock data for request types
  const requestTypeData = [
    { name: 'Refrigerator', value: 35 },
    { name: 'Washing Machine', value: 25 },
    { name: 'AC', value: 20 },
    { name: 'TV', value: 15 },
    { name: 'Others', value: 5 },
  ];

  // Mock data for monthly requests
  const monthlyRequestsData = [
    { name: 'Jan', pending: 4, completed: 10 },
    { name: 'Feb', pending: 3, completed: 12 },
    { name: 'Mar', pending: 5, completed: 15 },
    { name: 'Apr', pending: 4, completed: 13 },
    { name: 'May', pending: 3, completed: 18 },
    { name: 'Jun', pending: 6, completed: 20 },
  ];

  // Mock data for revenue trend
  const revenueTrendData = [
    { name: 'Jan', revenue: 1500 },
    { name: 'Feb', revenue: 1700 },
    { name: 'Mar', revenue: 1900 },
    { name: 'Apr', revenue: 1800 },
    { name: 'May', revenue: 2200 },
    { name: 'Jun', revenue: 2500 },
  ];

  // Colors for the pie chart
  const COLORS = ['#8B5CF6', '#14B8A6', '#6366F1', '#EC4899', '#F59E0B'];

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-200 p-2 border border-dark-100 rounded-md text-sm">
          <p className="text-gray-200">{`${payload[0].name}: ${payload[0].value}`}</p>
          <p className="text-primary-400">{`${payload[0].payload.percent.toFixed(2)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Request Types Chart */}
      <div className="card p-6">
        <h3 className="text-xl font-medium text-white mb-6">Request Types</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={requestTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {requestTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Requests Chart */}
      <div className="card p-6">
        <h3 className="text-xl font-medium text-white mb-6">Monthly Requests</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyRequestsData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" tick={{ fill: '#CBD5E1' }} />
              <YAxis tick={{ fill: '#CBD5E1' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155' }}
                labelStyle={{ color: '#F8FAFC' }}
                itemStyle={{ color: '#F8FAFC' }}
              />
              <Legend
                wrapperStyle={{ color: '#F8FAFC' }}
              />
              <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
              <Bar dataKey="completed" fill="#14B8A6" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="card p-6 lg:col-span-2">
        <h3 className="text-xl font-medium text-white mb-6">Revenue Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueTrendData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" tick={{ fill: '#CBD5E1' }} />
              <YAxis tick={{ fill: '#CBD5E1' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155' }}
                labelStyle={{ color: '#F8FAFC' }}
                itemStyle={{ color: '#F8FAFC' }}
                formatter={(value: number) => [`$${value}`, 'Revenue']}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', stroke: '#8B5CF6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;