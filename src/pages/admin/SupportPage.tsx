import React, { useState } from 'react';
import DashboardLayout from '../../components/common/DashboardLayout';
import DashboardHeader from '../../components/common/DashboardHeader';
import SupportTicketsList from '../../components/admin/SupportTicketsList';
import { useData } from '../../context/DataContext';
import { MessageCircle, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import StatsCard from '../../components/common/StatsCard';

const SupportPage: React.FC = () => {
  const { supportTickets, respondToSupportTicket } = useData();
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'in_progress' | 'resolved'>('all');
  
  // Filter tickets based on active tab
  const filteredTickets = activeTab === 'all' 
    ? supportTickets
    : supportTickets.filter(ticket => ticket.status === activeTab);

  // Calculate ticket statistics
  const totalTickets = supportTickets.length;
  const openTickets = supportTickets.filter(t => t.status === 'open').length;
  const inProgressTickets = supportTickets.filter(t => t.status === 'in_progress').length;
  const resolvedTickets = supportTickets.filter(t => t.status === 'resolved').length;

  const handleRespondToTicket = async (ticketId: string, response: string) => {
    await respondToSupportTicket(ticketId, response);
  };

  const tabs = [
    { id: 'all', label: 'All Tickets' },
    { id: 'open', label: 'Open' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'resolved', label: 'Resolved' },
  ];

  React.useEffect(() => {
    // Update the document title
    document.title = 'Support Management - ServEase';
  }, []);

  return (
    <DashboardLayout requiredRole="admin">
      <DashboardHeader 
        title="Support Management" 
        subtitle="Handle customer support tickets" 
      />
      
      <div className="p-6">
        {/* Support Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Tickets"
            value={totalTickets}
            icon={<MessageCircle size={20} />}
            color="primary"
          />
          <StatsCard
            title="Open Tickets"
            value={openTickets}
            icon={<AlertCircle size={20} />}
            color="warning"
          />
          <StatsCard
            title="In Progress"
            value={inProgressTickets}
            icon={<Clock size={20} />}
            color="secondary"
          />
          <StatsCard
            title="Resolved"
            value={resolvedTickets}
            icon={<CheckCircle size={20} />}
            color="success"
          />
        </div>

        {/* Status Tabs */}
        <div className="border-b border-dark-100 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab whitespace-nowrap ${
                  activeTab === tab.id ? 'tab-active' : ''
                }`}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets List */}
        <div className="card p-6">
          <SupportTicketsList 
            tickets={filteredTickets}
            onRespond={handleRespondToTicket}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SupportPage;