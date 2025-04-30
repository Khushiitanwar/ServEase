import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  React.useEffect(() => {
    // Update the document title
    document.title = 'Login - ServEase';
  }, []);

  return (
    <div className="min-h-screen bg-dark-300 flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="card p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white">Welcome Back!</h1>
              <p className="text-gray-400 mt-2">
                Log in to your ServEase account
              </p>
            </div>
            
            <LoginForm />
            
            <div className="mt-8 pt-6 border-t border-dark-100 text-center">
              <p className="text-gray-400 text-sm">
                New to ServEase? <Link to="/signup" className="text-primary-400 hover:text-primary-300">Create an account</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;