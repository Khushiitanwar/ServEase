export type UserRole = 'customer' | 'service_provider' | 'delivery_partner' | 'admin';

export type ApplianceType = 'refrigerator' | 'washing_machine' | 'air_conditioner' | 'television' | 'microwave' | 'oven' | 'dishwasher' | 'other';

export type RequestStatus = 'pending' | 'accepted' | 'in_repair' | 'repaired' | 'pickup_scheduled' | 'in_transit' | 'delivered' | 'completed' | 'cancelled';

export type DeliveryStatus = 'pending' | 'pickup_scheduled' | 'picked_up' | 'in_transit' | 'delivered';

export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

export type PaymentMethod = 'credit_card' | 'debit_card' | 'bank_transfer' | 'cash';

export type ComplaintStatus = 'open' | 'in_review' | 'resolved' | 'closed';

export type ComplaintType = 'service' | 'delivery' | 'payment' | 'other';

export type SupportTicketStatus = 'open' | 'in_progress' | 'resolved';

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  role: UserRole;
  createdAt: Date;
}

export interface RepairRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  applianceType: ApplianceType;
  brand: string;
  issueDescription: string;
  address: string;
  preferredDateTime: Date;
  assignedShopId: string | null;
  assignedShopName: string | null;
  status: RequestStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface RepairShop {
  id: string;
  name: string;
  location: string;
  contact: string;
  servicesOffered: ApplianceType[];
  availableSlots: string[];
  rating: number;
  reviewCount: number;
}

export interface Delivery {
  id: string;
  requestId: string;
  assignedPartnerId: string | null;
  assignedPartnerName: string | null;
  pickupTime: Date | null;
  deliveryStatus: DeliveryStatus;
  trackingDetails: string;
  deliveryFee: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  requestId: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  paymentDate: Date | null;
  transactionId: string;
}

export interface Complaint {
  id: string;
  userId: string;
  type: ComplaintType;
  message: string;
  status: ComplaintStatus;
  createdAt: Date;
  response: string | null;
  respondedAt: Date | null;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
  status: SupportTicketStatus;
  createdAt: Date;
  response: string | null;
  respondedAt: Date | null;
}

export interface PlatformStats {
  totalUsers: number;
  totalCustomers: number;
  totalServiceProviders: number;
  totalDeliveryPartners: number;
  totalRequests: number;
  pendingRequests: number;
  completedRequests: number;
  totalEarnings: number;
  activeRequests: number;
}