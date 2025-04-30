import React from 'react';
import { Users, ShieldCheck, Clock, Map, Star, Headphones } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Expert Technicians',
      description: 'Connect with certified repair professionals specialized in various appliance brands and models.'
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: 'Service Guarantee',
      description: 'All repair services come with a satisfaction guarantee for your peace of mind.'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Quick Turnaround',
      description: 'Most repairs are completed within 24-48 hours of pick-up for minimal disruption.'
    },
    {
      icon: <Map className="h-6 w-6" />,
      title: 'Live Tracking',
      description: 'Track your appliance journey from pickup to delivery in real-time through our platform.'
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Verified Reviews',
      description: 'Choose service providers based on authentic customer ratings and reviews.'
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: '24/7 Support',
      description: 'Our customer service team is available around the clock to assist with any issues.'
    }
  ];

  return (
    <div className="bg-dark-200 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">Why Choose ServEase</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            We make appliance repair hassle-free with these exceptional features
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-dark-300 border border-dark-100 rounded-lg p-6 transition-all duration-300 hover:border-primary-500 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-primary-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;