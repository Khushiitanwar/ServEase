import React from 'react';
import { MessageCircle, User } from 'lucide-react';
import DataTable from '../common/DataTable';
import { SupportTicket } from '../../types';
import { formatDate } from '../../utils/formatters';
import StatusBadge from '../common/StatusBadge';

interface SupportTicketsListProps {
  tickets: SupportTicket[];
  onRespond: (ticketId: string, response: string) => void;
}

const SupportTicketsList: React.FC<SupportTicketsListProps> = ({ tickets, onRespond }) => {
  const [responseText, setResponseText] = React.useState<Record<string, string>>({});
  const [ticketsWithOpenForm, setTicketsWithOpenForm] = React.useState<Record<string, boolean>>({});

  const handleOpenResponseForm = (ticketId: string) => {
    setTicketsWithOpenForm(prev => ({
      ...prev,
      [ticketId]: true,
    }));
  };

  const handleCloseResponseForm = (ticketId: string) => {
    setTicketsWithOpenForm(prev => ({
      ...prev,
      [ticketId]: false,
    }));
  };

  const handleSubmitResponse = (ticketId: string) => {
    const response = responseText[ticketId];
    if (response && response.trim()) {
      onRespond(ticketId, response);
      handleCloseResponseForm(ticketId);
      setResponseText(prev => ({
        ...prev,
        [ticketId]: '',
      }));
    }
  };

  const columns = [
    {
      header: 'User',
      accessor: (ticket: SupportTicket) => (
        <div className="flex items-center">
          <div className="bg-primary-800 text-primary-200 rounded-full w-8 h-8 flex items-center justify-center mr-3">
            <User size={16} />
          </div>
          <div>
            <p className="font-medium text-white">{ticket.userName}</p>
            <p className="text-gray-400 text-xs">{ticket.userEmail}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Query',
      accessor: (ticket: SupportTicket) => (
        <div className="flex items-start">
          <div className="bg-primary-800 text-primary-200 rounded-md p-1.5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
            <MessageCircle size={14} />
          </div>
          <div>
            <p className="font-medium text-white mb-1">{ticket.subject}</p>
            <p className="text-gray-300 text-sm">{ticket.message}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: (ticket: SupportTicket) => (
        <StatusBadge status={ticket.status} type="support" />
      ),
    },
    {
      header: 'Date',
      accessor: (ticket: SupportTicket) => (
        <div className="text-gray-300 text-sm">
          {formatDate(ticket.createdAt)}
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: (ticket: SupportTicket) => (
        <div>
          {ticket.status === 'open' ? (
            ticketsWithOpenForm[ticket.id] ? (
              <div className="space-y-2">
                <textarea
                  className="w-full bg-dark-100 border border-dark-100 rounded-md text-gray-200 text-sm p-2"
                  rows={2}
                  placeholder="Type your response..."
                  value={responseText[ticket.id] || ''}
                  onChange={(e) => setResponseText(prev => ({
                    ...prev,
                    [ticket.id]: e.target.value,
                  }))}
                ></textarea>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSubmitResponse(ticket.id)}
                    className="px-2 py-1 bg-primary-600 text-white rounded-md text-xs hover:bg-primary-500 transition-colors"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => handleCloseResponseForm(ticket.id)}
                    className="px-2 py-1 bg-dark-100 text-gray-300 rounded-md text-xs hover:bg-dark-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => handleOpenResponseForm(ticket.id)}
                className="px-2 py-1 bg-primary-900/50 text-primary-300 rounded-md text-xs hover:bg-primary-900/70 transition-colors"
              >
                Respond
              </button>
            )
          ) : (
            <button className="px-2 py-1 bg-dark-100 text-gray-300 rounded-md text-xs hover:bg-dark-200 transition-colors">
              View Details
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={tickets}
      columns={columns}
      keyExtractor={(ticket) => ticket.id}
      emptyMessage="No support tickets found"
    />
  );
};

export default SupportTicketsList;