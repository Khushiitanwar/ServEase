import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/common/DashboardLayout';
import DashboardHeader from '../../components/common/DashboardHeader';
import ServiceRequestForm from '../../components/customer/ServiceRequestForm';
import ShopSelection from '../../components/customer/ShopSelection';
import { RepairRequest } from '../../types';
import { useData } from '../../context/DataContext';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const RequestServicePage: React.FC = () => {
  const { repairShops, assignRepairRequest, createDelivery } = useData();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [request, setRequest] = useState<RepairRequest | null>(null);
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [selectedShopName, setSelectedShopName] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  
  const handleRequestComplete = (newRequest: RepairRequest) => {
    setRequest(newRequest);
    setCurrentStep(2);
  };
  
  const handleShopSelect = (shopId: string, shopName: string) => {
    setSelectedShopId(shopId);
    setSelectedShopName(shopName);
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleNextStep = async () => {
    if (currentStep === 2 && request && selectedShopId && selectedShopName) {
      try {
        // Assign the shop to the request
        await assignRepairRequest(request.id, selectedShopId, selectedShopName);
        
        // Create a delivery for this request
        await createDelivery(request.id);
        
        // Move to final step
        setCompleted(true);
        setCurrentStep(3);
      } catch (err) {
        console.error('Error finalizing request:', err);
      }
    }
  };
  
  const handleFinish = () => {
    navigate('/customer-dashboard/track-order');
  };

  React.useEffect(() => {
    // Update the document title
    document.title = 'Request Service - ServEase';
  }, []);
  
  return (
    <DashboardLayout requiredRole="customer">
      <DashboardHeader 
        title="Request Service" 
        subtitle="Submit a new repair request for your appliance" 
      />
      
      <div className="p-6">
        {/* Step Indicator */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="relative flex items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-dark-100 text-gray-400'
                }`}>
                  1
                </div>
                <div className={`h-1 flex-1 ${
                  currentStep >= 2 ? 'bg-primary-600' : 'bg-dark-100'
                }`}></div>
              </div>
              <p className={`text-sm mt-1 ${
                currentStep >= 1 ? 'text-primary-400' : 'text-gray-500'
              }`}>
                Request Details
              </p>
            </div>
            
            <div className="flex-1">
              <div className="relative flex items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-dark-100 text-gray-400'
                }`}>
                  2
                </div>
                <div className={`h-1 flex-1 ${
                  currentStep >= 3 ? 'bg-primary-600' : 'bg-dark-100'
                }`}></div>
              </div>
              <p className={`text-sm mt-1 ${
                currentStep >= 2 ? 'text-primary-400' : 'text-gray-500'
              }`}>
                Select Provider
              </p>
            </div>
            
            <div className="flex-1">
              <div className="relative flex items-center justify-end">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  currentStep >= 3 ? 'bg-primary-600 text-white' : 'bg-dark-100 text-gray-400'
                }`}>
                  3
                </div>
              </div>
              <p className={`text-sm mt-1 text-right ${
                currentStep >= 3 ? 'text-primary-400' : 'text-gray-500'
              }`}>
                Confirmation
              </p>
            </div>
          </div>
        </div>
        
        {/* Step Content */}
        <div className="max-w-3xl mx-auto card p-6">
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-semibold text-white mb-4">Enter Service Details</h2>
              <p className="text-gray-400 mb-6">
                Please provide information about your appliance and the issue you're experiencing.
              </p>
              
              <ServiceRequestForm onRequestComplete={handleRequestComplete} />
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-semibold text-white mb-4">Select a Service Provider</h2>
              <p className="text-gray-400 mb-6">
                Choose a service provider from the list below to handle your repair request.
              </p>
              
              <ShopSelection 
                shops={repairShops} 
                onSelectShop={handleShopSelect} 
              />
              
              <div className="mt-8 flex justify-between">
                <button 
                  onClick={handlePrevStep}
                  className="btn-outline flex items-center"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </button>
                
                <button 
                  onClick={handleNextStep}
                  className={`btn-primary flex items-center ${
                    !selectedShopId ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={!selectedShopId}
                >
                  Continue
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="animate-fade-in text-center py-8">
              <div className="bg-primary-900/30 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={40} className="text-primary-500" />
              </div>
              
              <h2 className="text-2xl font-semibold text-white mb-2">Request Submitted Successfully!</h2>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Your service request has been submitted and assigned to {selectedShopName}. 
                You can track the status of your repair in the dashboard.
              </p>
              
              <button 
                onClick={handleFinish}
                className="btn-primary"
              >
                Track Your Request
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RequestServicePage;