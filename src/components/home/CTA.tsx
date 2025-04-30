import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-primary-900 to-dark-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-dark-200 border border-dark-100 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="relative h-64 md:h-auto">
              <img
                src="https://images.pexels.com/photos/4116193/pexels-photo-4116193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Appliance Repair"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/70 to-dark-300/50"></div>
            </div>
            
            {/* Content Section */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready for Hassle-Free Appliance Repairs?
              </h2>
              <p className="text-gray-300 mb-8">
                Join thousands of satisfied customers who trust ServEase for quick, reliable, and transparent appliance repair services. Sign up today and experience the difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="btn-primary text-base px-6 py-3 flex items-center justify-center">
                  Create an Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/contact" className="btn-outline text-base px-6 py-3">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;