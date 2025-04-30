import React, { useState } from 'react';
import { ApplianceType, RepairRequest } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface ServiceRequestFormProps {
  onRequestComplete: (request: RepairRequest) => void;
}

const ServiceRequestForm: React.FC<ServiceRequestFormProps> = ({ onRequestComplete }) => {
  const { currentUser } = useAuth();
  const { createRepairRequest } = useData();
  
  const [formData, setFormData] = useState({
    applianceType: 'refrigerator' as ApplianceType,
    brand: '',
    issueDescription: '',
    address: '',
    preferredDate: '',
    preferredTime: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError('You must be logged in to submit a service request');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const preferredDateTime = new Date(`${formData.preferredDate}T${formData.preferredTime}`);
      
      const requestData = {
        customerId: currentUser.id,
        customerName: currentUser.fullName,
        customerPhone: currentUser.phone,
        applianceType: formData.applianceType,
        brand: formData.brand,
        issueDescription: formData.issueDescription,
        address: formData.address,
        preferredDateTime,
      };
      
      const request = await createRepairRequest(requestData);
      onRequestComplete(request);
    } catch (err) {
      console.error('Error creating service request:', err);
      setError('An error occurred while submitting your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label htmlFor="applianceType" className="form-label">Appliance Type</label>
          <select
            id="applianceType"
            name="applianceType"
            className="select-field"
            value={formData.applianceType}
            onChange={handleChange}
            required
          >
            <option value="refrigerator">Refrigerator</option>
            <option value="washing_machine">Washing Machine</option>
            <option value="air_conditioner">Air Conditioner</option>
            <option value="television">Television</option>
            <option value="microwave">Microwave</option>
            <option value="oven">Oven</option>
            <option value="dishwasher">Dishwasher</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="brand" className="form-label">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            className="input-field"
            placeholder="e.g. Samsung, LG, Whirlpool"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="issueDescription" className="form-label">Issue Description</label>
        <textarea
          id="issueDescription"
          name="issueDescription"
          rows={4}
          className="input-field"
          placeholder="Please describe the issue you're experiencing with your appliance..."
          value={formData.issueDescription}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      
      <div className="form-group">
        <label htmlFor="address" className="form-label">Pickup Address</label>
        <textarea
          id="address"
          name="address"
          rows={2}
          className="input-field"
          placeholder="Your full address for pickup and delivery"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label htmlFor="preferredDate" className="form-label">Preferred Date</label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            className="input-field"
            value={formData.preferredDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]} // Today's date as minimum
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="preferredTime" className="form-label">Preferred Time</label>
          <input
            type="time"
            id="preferredTime"
            name="preferredTime"
            className="input-field"
            value={formData.preferredTime}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className={`btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </div>
          ) : 'Submit Request'}
        </button>
      </div>
    </form>
  );
};

export default ServiceRequestForm;