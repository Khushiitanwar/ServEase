import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import SignupForm from '../../components/auth/SignupForm';

const SignupPage: React.FC = () => {
  React.useEffect(() => {
    // Update the document title
    document.title = 'Sign Up - ServEase';
  }, []);

  return (
    <div className="min-h-screen bg-dark-300 flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="card p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white">Create Your Account</h1>
              <p className="text-gray-400 mt-2">
                Join ServEase to connect with repair services and manage your appliance repairs
              </p>
            </div>
            
            <SignupForm />
            
            <div className="mt-8 pt-6 border-t border-dark-100 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account? <Link to="/login" className="text-primary-400 hover:text-primary-300">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;