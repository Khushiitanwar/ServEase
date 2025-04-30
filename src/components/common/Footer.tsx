import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-300 border-t border-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-primary-500 p-1 rounded-md bg-primary-900">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-6 h-6"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <span className="text-white font-bold text-xl">ServEase</span>
            </div>
            <p className="text-gray-400 text-sm">
              ServEase is a platform that connects customers with nearby repair service centers and manages appliance pickup and delivery via delivery partners.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-4">For Users</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/signup" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Sign Up</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Login</Link>
              </li>
              <li>
                <Link to="/customer-dashboard" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Customer Portal</Link>
              </li>
              <li>
                <Link to="/service-provider-dashboard" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Service Provider Portal</Link>
              </li>
              <li>
                <Link to="/delivery-partner-dashboard" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Delivery Partner Portal</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-primary-400 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-400 text-sm">123 ServEase Street, Tech City, TX 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-primary-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-primary-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400 text-sm">support@servease.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-dark-100 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {currentYear} ServEase. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;