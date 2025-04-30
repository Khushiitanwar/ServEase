import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatarUrl: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, role, content, rating, avatarUrl }) => {
  return (
    <div className="bg-dark-200 rounded-xl shadow-md p-6 border border-dark-100 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <img
          src={avatarUrl}
          alt={name}
          className="h-12 w-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="text-white font-medium">{name}</h4>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
          />
        ))}
      </div>
      <p className="text-gray-300 italic flex-grow">{content}</p>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Emily Johnson',
      role: 'Customer',
      content: 'ServEase saved me so much time and hassle with my refrigerator repair. The pickup was prompt, and I could track the entire process. Highly recommended!',
      rating: 5,
      avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      name: 'Michael Rodriguez',
      role: 'Service Provider',
      content: 'As a repair specialist, joining ServEase has significantly increased my business. The platform streamlines customer acquisition and all the logistics.',
      rating: 5,
      avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      name: 'Sarah Thompson',
      role: 'Customer',
      content: 'My washing machine broke down right before a big family gathering. ServEase connected me with a repair service that fixed it within 24 hours!',
      rating: 4,
      avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      name: 'David Wilson',
      role: 'Delivery Partner',
      content: 'The ServEase platform is intuitive and makes managing pickups and deliveries seamless. I\'ve been able to grow my delivery business substantially.',
      rating: 5,
      avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  ];

  return (
    <div className="bg-dark-300 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">What People Say About Us</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Real experiences from our customers, service providers, and delivery partners
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              rating={testimonial.rating}
              avatarUrl={testimonial.avatarUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;