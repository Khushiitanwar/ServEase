import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PenTool as Tool, Truck, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-dark-300 pb-16">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-dark-300"></div>
      
      {/* Hero content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
              Seamless Appliance Repairs
            </span>
            <br /> Made Simple
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with nearby repair services and manage appliance pickup and 
            delivery, all in one platform.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup" className="btn-primary text-base px-8 py-3 flex items-center justify-center">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/about" className="btn-outline text-base px-8 py-3">
              Learn More
            </Link>
          </div>
        </div>
      </div>
      
      {/* How it works section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          How ServEase Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <div className="relative bg-dark-200 rounded-xl p-6 border border-dark-100 flex flex-col items-center text-center animate-fade-in">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white text-sm font-bold rounded-full h-8 w-8 flex items-center justify-center">
              1
            </div>
            <div className="h-16 w-16 bg-primary-900/50 rounded-full flex items-center justify-center mb-4 mt-4">
              <Tool className="h-8 w-8 text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Request Service</h3>
            <p className="text-gray-400">
              Submit your appliance repair request with details about the issue and schedule a convenient time.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="relative bg-dark-200 rounded-xl p-6 border border-dark-100 flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white text-sm font-bold rounded-full h-8 w-8 flex items-center justify-center">
              2
            </div>
            <div className="h-16 w-16 bg-secondary-900/50 rounded-full flex items-center justify-center mb-4 mt-4">
              <Truck className="h-8 w-8 text-secondary-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Pickup & Repair</h3>
            <p className="text-gray-400">
              Our delivery partners pick up your appliance and deliver it to the service center for repair.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="relative bg-dark-200 rounded-xl p-6 border border-dark-100 flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white text-sm font-bold rounded-full h-8 w-8 flex items-center justify-center">
              3
            </div>
            <div className="h-16 w-16 bg-green-900/50 rounded-full flex items-center justify-center mb-4 mt-4">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Return & Delivery</h3>
            <p className="text-gray-400">
              Once repaired, your appliance is delivered back to your doorstep, functioning like new.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;