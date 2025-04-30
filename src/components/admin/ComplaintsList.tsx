import React from 'react';
import { Complaint } from '../../types';
import DataTable from '../common/DataTable';
import { formatDate } from '../../utils/formatters';
import StatusBadge from '../common/StatusBadge';
import { MessageCircle } from 'lucide-react';

interface ComplaintsListProps {
  complaints: Complaint[];
  onRespond: (complaintId: string, response: string) => void;
}

const ComplaintsList: React.FC<ComplaintsListProps> = ({ complaints, onRespond }) => {
  // Sort complaints by creation date (newest first)
  const sortedComplaints = [...complaints].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const formatType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  const [responseText, setResponseText] = React.useState<Record<string, string>>({});
  const [complaintsWithOpenForm, setComplaintsWithOpenForm] = React.useState<Record<string, boolean>>({});

  const handleOpenResponseForm = (complaintId: string) => {
    setComplaintsWithOpenForm(prev => ({
      ...prev,
      [complaintId]: true,
    }));
  };

  const handleCloseResponseForm = (complaintId: string) => {
    setComplaintsWithOpenForm(prev => ({
      ...prev,
      [complaintId]: false,
    }));
  };

  const handleSubmitResponse = (complaintId: string) => {
    const response = responseText[complaintId];
    if (response && response.trim()) {
      onRespond(complaintId, response);
      handleCloseResponseForm(complaintId);
      setResponseText(prev => ({
        ...prev,
        [complaintId]: '',
      }));
    }
  };

  const columns = [
    {
      header: 'Complaint',
      accessor: (complaint: Complaint) => (
        <div className="flex items-start">
          <div className="bg-primary-800 text-primary-200 rounded-md p-1.5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
            <MessageCircle size={14} />
          </div>
          <div>
            <p className="font-medium text-white mb-1">
              {formatType(complaint.type)} Issue
            </p>
            <p className="text-gray-300 text-sm">{complaint.message}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: (complaint: Complaint) => (
        <StatusBadge status={complaint.status} type="complaint" />
      ),
    },
    {
      header: 'Date',
      accessor: (complaint: Complaint) => (
        <div className="text-gray-300 text-sm">
          {formatDate(complaint.createdAt)}
        </div>
      ),
    },
    {
      header: 'Response',
      accessor: (complaint: Complaint) => (
        <div>
          {complaint.response ? (
            <div className="text-gray-300 text-sm">
              <p>{complaint.response}</p>
              <p className="text-gray-400 text-xs mt-1">
                Responded on {formatDate(complaint.respondedAt!)}
              </p>
            </div>
          ) : (
            <span className="text-gray-400 text-sm">Not responded yet</span>
          )}
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: (complaint: Complaint) => (
        <div>
          {complaint.status === 'open' ? (
            complaintsWithOpenForm[complaint.id] ? (
              <div className="space-y-2">
                <textarea
                  className="w-full bg-dark-100 border border-dark-100 rounded-md text-gray-200 text-sm p-2"
                  rows={2}
                  placeholder="Type your response..."
                  value={responseText[complaint.id] || ''}
                  onChange={(e) => setResponseText(prev => ({
                    ...prev,
                    [complaint.id]: e.target.value,
                  }))}
                ></textarea>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSubmitResponse(complaint.id)}
                    className="px-2 py-1 bg-primary-600 text-white rounded-md text-xs hover:bg-primary-500 transition-colors"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => handleCloseResponseForm(complaint.id)}
                    className="px-2 py-1 bg-dark-100 text-gray-300 rounded-md text-xs hover:bg-dark-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => handleOpenResponseForm(complaint.id)}
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
      data={sortedComplaints}
      columns={columns}
      keyExtractor={(complaint) => complaint.id}
      emptyMessage="No complaints found"
    />
  );
};

export default ComplaintsList;