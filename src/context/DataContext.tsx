import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  RepairRequest,
  RepairShop,
  Delivery,
  Payment,
  Complaint,
  PlatformStats,
  RequestStatus,
  ApplianceType,
  User,
  UserRole,
  SupportTicket,
} from '../types';
import { useAuth } from './AuthContext';

interface DataContextType {
  // Data collections
  repairRequests: RepairRequest[];
  repairShops: RepairShop[];
  deliveries: Delivery[];
  payments: Payment[];
  complaints: Complaint[];
  platformStats: PlatformStats;
  supportTickets: SupportTicket[];
  
  // Actions
  createRepairRequest: (requestData: Omit<RepairRequest, 'id' | 'status' | 'assignedShopId' | 'assignedShopName' | 'createdAt' | 'updatedAt'>) => Promise<RepairRequest>;
  updateRequestStatus: (requestId: string, status: RequestStatus, shopId?: string, shopName?: string) => Promise<boolean>;
  assignRepairRequest: (requestId: string, shopId: string, shopName: string) => Promise<boolean>;
  createDelivery: (requestId: string) => Promise<Delivery>;
  updateDeliveryStatus: (deliveryId: string, status: string, partnerId?: string, partnerName?: string) => Promise<boolean>;
  createPayment: (requestId: string, amount: number) => Promise<Payment>;
  createComplaint: (complaintData: Omit<Complaint, 'id' | 'status' | 'createdAt' | 'response' | 'respondedAt'>) => Promise<Complaint>;
  respondToComplaint: (complaintId: string, response: string) => Promise<boolean>;
  createSupportTicket: (ticketData: Omit<SupportTicket, 'id' | 'status' | 'createdAt' | 'response' | 'respondedAt'>) => Promise<SupportTicket>;
  respondToSupportTicket: (ticketId: string, response: string) => Promise<boolean>;
  
  // Filtered data getters
  getUserRequests: (userId: string) => RepairRequest[];
  getShopRequests: (shopId: string) => RepairRequest[];
  getPartnerDeliveries: (partnerId: string) => Delivery[];
  getUsersWithRole: (role: UserRole) => User[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  // Load data from localStorage
  const [repairRequests, setRepairRequests] = useLocalStorage<RepairRequest[]>('repairRequests', []);
  const [repairShops, setRepairShops] = useLocalStorage<RepairShop[]>('repairShops', []);
  const [deliveries, setDeliveries] = useLocalStorage<Delivery[]>('deliveries', []);
  const [payments, setPayments] = useLocalStorage<Payment[]>('payments', []);
  const [complaints, setComplaints] = useLocalStorage<Complaint[]>('complaints', []);
  const [users] = useLocalStorage<User[]>('users', []);
  const [supportTickets, setSupportTickets] = useLocalStorage<SupportTicket[]>('supportTickets', []);
  
  // Platform statistics
  const [platformStats, setPlatformStats] = useState<PlatformStats>({
    totalUsers: 0,
    totalCustomers: 0,
    totalServiceProviders: 0,
    totalDeliveryPartners: 0,
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    totalEarnings: 0,
    activeRequests: 0,
  });

  const { currentUser } = useAuth();

  // Initialize mock repair shops if none exist
  useEffect(() => {
    if (repairShops.length === 0) {
      const mockShops: RepairShop[] = [
        {
          id: 'shop-1',
          name: 'ElectroFix Pro',
          location: 'Downtown',
          contact: '123-456-7890',
          servicesOffered: ['refrigerator', 'washing_machine', 'air_conditioner'],
          availableSlots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
          rating: 4.7,
          reviewCount: 112,
        },
        {
          id: 'shop-2',
          name: 'ApplianceMasters',
          location: 'Uptown',
          contact: '098-765-4321',
          servicesOffered: ['television', 'microwave', 'oven'],
          availableSlots: ['10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
          rating: 4.5,
          reviewCount: 87,
        },
        {
          id: 'shop-3',
          name: 'TechRepair Solutions',
          location: 'Midtown',
          contact: '111-222-3333',
          servicesOffered: ['washing_machine', 'dishwasher', 'refrigerator'],
          availableSlots: ['9:30 AM', '12:30 PM', '3:30 PM', '5:30 PM'],
          rating: 4.8,
          reviewCount: 94,
        },
      ];
      setRepairShops(mockShops);
    }
  }, [repairShops.length, setRepairShops]);

  // Update platform statistics whenever relevant data changes
  useEffect(() => {
    setPlatformStats({
      totalUsers: users.length,
      totalCustomers: users.filter(u => u.role === 'customer').length,
      totalServiceProviders: users.filter(u => u.role === 'service_provider').length,
      totalDeliveryPartners: users.filter(u => u.role === 'delivery_partner').length,
      totalRequests: repairRequests.length,
      pendingRequests: repairRequests.filter(r => r.status === 'pending').length,
      completedRequests: repairRequests.filter(r => r.status === 'completed').length,
      totalEarnings: payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
      activeRequests: repairRequests.filter(r => 
        ['pending', 'accepted', 'in_repair', 'repaired', 'pickup_scheduled', 'in_transit'].includes(r.status)
      ).length,
    });
  }, [users, repairRequests, payments]);

  // Create new repair request
  const createRepairRequest = async (
    requestData: Omit<RepairRequest, 'id' | 'status' | 'assignedShopId' | 'assignedShopName' | 'createdAt' | 'updatedAt'>
  ): Promise<RepairRequest> => {
    const now = new Date();
    const newRequest: RepairRequest = {
      ...requestData,
      id: `request-${Date.now()}`,
      status: 'pending',
      assignedShopId: null,
      assignedShopName: null,
      createdAt: now,
      updatedAt: now,
    };
    
    setRepairRequests(prev => [...prev, newRequest]);
    return newRequest;
  };

  // Update request status
  const updateRequestStatus = async (
    requestId: string, 
    status: RequestStatus,
    shopId?: string,
    shopName?: string
  ): Promise<boolean> => {
    const now = new Date();
    setRepairRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { 
              ...request, 
              status, 
              updatedAt: now,
              ...(shopId && { assignedShopId: shopId }),
              ...(shopName && { assignedShopName: shopName })
            } 
          : request
      )
    );
    return true;
  };

  // Assign repair request to shop
  const assignRepairRequest = async (
    requestId: string,
    shopId: string,
    shopName: string
  ): Promise<boolean> => {
    setRepairRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { 
              ...request, 
              assignedShopId: shopId,
              assignedShopName: shopName,
              status: 'accepted',
              updatedAt: new Date()
            } 
          : request
      )
    );
    return true;
  };

  // Create new delivery
  const createDelivery = async (requestId: string): Promise<Delivery> => {
    const now = new Date();
    const newDelivery: Delivery = {
      id: `delivery-${Date.now()}`,
      requestId,
      assignedPartnerId: null,
      assignedPartnerName: null,
      pickupTime: null,
      deliveryStatus: 'pending',
      trackingDetails: 'Delivery request created',
      deliveryFee: 25.00,
      createdAt: now,
      updatedAt: now,
    };
    
    setDeliveries(prev => [...prev, newDelivery]);
    return newDelivery;
  };

  // Update delivery status
  const updateDeliveryStatus = async (
    deliveryId: string, 
    status: string,
    partnerId?: string,
    partnerName?: string
  ): Promise<boolean> => {
    const now = new Date();
    setDeliveries(prev => 
      prev.map(delivery => 
        delivery.id === deliveryId 
          ? { 
              ...delivery, 
              deliveryStatus: status as any,
              updatedAt: now,
              ...(partnerId && { assignedPartnerId: partnerId }),
              ...(partnerName && { assignedPartnerName: partnerName }),
              ...(status === 'picked_up' && { pickupTime: now })
            } 
          : delivery
      )
    );
    return true;
  };

  // Create payment
  const createPayment = async (requestId: string, amount: number): Promise<Payment> => {
    const newPayment: Payment = {
      id: `payment-${Date.now()}`,
      requestId,
      amount,
      status: 'pending',
      method: 'credit_card',
      paymentDate: null,
      transactionId: `txn-${Date.now()}`,
    };
    
    setPayments(prev => [...prev, newPayment]);
    return newPayment;
  };

  // Create complaint
  const createComplaint = async (
    complaintData: Omit<Complaint, 'id' | 'status' | 'createdAt' | 'response' | 'respondedAt'>
  ): Promise<Complaint> => {
    const now = new Date();
    const newComplaint: Complaint = {
      ...complaintData,
      id: `complaint-${Date.now()}`,
      status: 'open',
      createdAt: now,
      response: null,
      respondedAt: null,
    };
    
    setComplaints(prev => [...prev, newComplaint]);
    return newComplaint;
  };

  // Respond to complaint
  const respondToComplaint = async (complaintId: string, response: string): Promise<boolean> => {
    const now = new Date();
    setComplaints(prev => 
      prev.map(complaint => 
        complaint.id === complaintId 
          ? { 
              ...complaint, 
              status: 'resolved',
              response,
              respondedAt: now
            } 
          : complaint
      )
    );
    return true;
  };

  // Create support ticket
  const createSupportTicket = async (
    ticketData: Omit<SupportTicket, 'id' | 'status' | 'createdAt' | 'response' | 'respondedAt'>
  ): Promise<SupportTicket> => {
    const now = new Date();
    const newTicket: SupportTicket = {
      ...ticketData,
      id: `ticket-${Date.now()}`,
      status: 'open',
      createdAt: now,
      response: null,
      respondedAt: null,
    };
    
    setSupportTickets(prev => [...prev, newTicket]);
    return newTicket;
  };

  // Respond to support ticket
  const respondToSupportTicket = async (ticketId: string, response: string): Promise<boolean> => {
    const now = new Date();
    setSupportTickets(prev => 
      prev.map(ticket => 
        ticket.id === ticketId 
          ? { 
              ...ticket, 
              status: 'resolved',
              response,
              respondedAt: now
            } 
          : ticket
      )
    );
    return true;
  };

  // Get requests for a specific user
  const getUserRequests = (userId: string): RepairRequest[] => {
    return repairRequests.filter(request => request.customerId === userId);
  };

  // Get requests assigned to a specific shop
  const getShopRequests = (shopId: string): RepairRequest[] => {
    return repairRequests.filter(request => request.assignedShopId === shopId);
  };

  // Get deliveries assigned to a specific partner
  const getPartnerDeliveries = (partnerId: string): Delivery[] => {
    return deliveries.filter(delivery => delivery.assignedPartnerId === partnerId);
  };

  // Get users with a specific role
  const getUsersWithRole = (role: UserRole): User[] => {
    return users.filter(user => user.role === role);
  };

  const value = {
    repairRequests,
    repairShops,
    deliveries,
    payments,
    complaints,
    platformStats,
    supportTickets,
    
    createRepairRequest,
    updateRequestStatus,
    assignRepairRequest,
    createDelivery,
    updateDeliveryStatus,
    createPayment,
    createComplaint,
    respondToComplaint,
    createSupportTicket,
    respondToSupportTicket,
    
    getUserRequests,
    getShopRequests,
    getPartnerDeliveries,
    getUsersWithRole,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};