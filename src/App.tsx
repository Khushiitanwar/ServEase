import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import NotFoundPage from './pages/NotFoundPage';

// Customer Pages
import CustomerDashboardPage from './pages/customer/CustomerDashboardPage';
import RequestServicePage from './pages/customer/RequestServicePage';
import TrackOrderPage from './pages/customer/TrackOrderPage';
import ServiceHistoryPage from './pages/customer/ServiceHistoryPage';

// Service Provider Pages
import ServiceProviderDashboardPage from './pages/service-provider/ServiceProviderDashboardPage';

// Delivery Partner Pages
import DeliveryPartnerDashboardPage from './pages/delivery-partner/DeliveryPartnerDashboardPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import UsersManagementPage from './pages/admin/UsersManagementPage';
import SupportPage from './pages/admin/SupportPage';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Customer Routes */}
            <Route path="/customer-dashboard" element={<CustomerDashboardPage />} />
            <Route path="/customer-dashboard/request-service" element={<RequestServicePage />} />
            <Route path="/customer-dashboard/track-order" element={<TrackOrderPage />} />
            <Route path="/customer-dashboard/service-history" element={<ServiceHistoryPage />} />
            
            {/* Service Provider Routes */}
            <Route path="/service-provider-dashboard" element={<ServiceProviderDashboardPage />} />
            
            {/* Delivery Partner Routes */}
            <Route path="/delivery-partner-dashboard" element={<DeliveryPartnerDashboardPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin-dashboard/users" element={<UsersManagementPage />} />
            <Route path="/admin-dashboard/support" element={<SupportPage />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;