import React, { useState } from 'react';
import { Map, Star, PenTool as Tool, MapPin, Phone } from 'lucide-react';
import { RepairShop } from '../../types';

interface ShopSelectionProps {
  shops: RepairShop[];
  onSelectShop: (shopId: string, shopName: string) => void;
}

const ShopSelection: React.FC<ShopSelectionProps> = ({ shops, onSelectShop }) => {
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  
  const handleSelect = (shopId: string, shopName: string) => {
    setSelectedShopId(shopId);
    onSelectShop(shopId, shopName);
  };

  if (shops.length === 0) {
    return (
      <div className="bg-dark-200 rounded-lg p-8 text-center border border-dashed border-dark-100">
        <Map className="h-12 w-12 text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-300 mb-2">No Service Providers Available</h3>
        <p className="text-gray-400 mb-4">There are no service providers available for your repair.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-white mb-4">Select a Service Provider</h3>
      
      {shops.map((shop) => (
        <div 
          key={shop.id} 
          className={`card p-6 cursor-pointer transition-all duration-200 ${
            selectedShopId === shop.id 
              ? 'border-2 border-primary-500' 
              : 'border border-dark-100 hover:border-gray-600'
          }`}
          onClick={() => handleSelect(shop.id, shop.name)}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start">
              <div className="mr-4 p-3 bg-dark-100 rounded-md">
                <Tool className="h-6 w-6 text-primary-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">{shop.name}</h4>
                <div className="flex items-center mt-1">
                  <div className="flex items-center mr-3">
                    <Star size={14} className="text-yellow-400 mr-1" />
                    <span className="text-gray-300 text-sm">{shop.rating}</span>
                    <span className="text-gray-500 text-xs ml-1">({shop.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`h-5 w-5 rounded-full flex items-center justify-center border-2 ${
              selectedShopId === shop.id 
                ? 'border-primary-500 bg-primary-500' 
                : 'border-gray-600'
            }`}>
              {selectedShopId === shop.id && (
                <div className="h-2 w-2 rounded-full bg-white"></div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm mt-2 mb-3">
            <div className="flex items-start">
              <MapPin size={16} className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-gray-300">{shop.location}</span>
            </div>
            <div className="flex items-start">
              <Phone size={16} className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-gray-300">{shop.contact}</span>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-400 mb-2">Services Offered:</p>
            <div className="flex flex-wrap gap-2">
              {shop.servicesOffered.map((service, index) => (
                <span 
                  key={index} 
                  className="bg-dark-100 text-gray-300 px-2 py-1 rounded-md text-xs"
                >
                  {service.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-4 border-t border-dark-100 pt-4">
            <p className="text-sm text-gray-400 mb-2">Available Slots:</p>
            <div className="flex flex-wrap gap-2">
              {shop.availableSlots.map((slot, index) => (
                <span 
                  key={index} 
                  className="bg-dark-100 text-gray-300 px-2 py-1 rounded-md text-xs"
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopSelection;