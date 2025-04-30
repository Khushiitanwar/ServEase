/*
  # Initial Schema Setup for ServEase

  1. New Tables
    - users
      - id (uuid, primary key)
      - full_name (text)
      - email (text, unique)
      - phone (text)
      - city (text)
      - role (text)
      - created_at (timestamp)
    
    - repair_requests
      - id (uuid, primary key)
      - customer_id (uuid, references users)
      - appliance_type (text)
      - brand (text)
      - issue_description (text)
      - address (text)
      - preferred_date_time (timestamp)
      - assigned_shop_id (uuid, references users)
      - status (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - deliveries
      - id (uuid, primary key)
      - request_id (uuid, references repair_requests)
      - assigned_partner_id (uuid, references users)
      - pickup_time (timestamp)
      - delivery_status (text)
      - tracking_details (text)
      - delivery_fee (numeric)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - payments
      - id (uuid, primary key)
      - request_id (uuid, references repair_requests)
      - amount (numeric)
      - status (text)
      - method (text)
      - payment_date (timestamp)
      - transaction_id (text)
      - created_at (timestamp)
    
    - complaints
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - type (text)
      - message (text)
      - status (text)
      - response (text)
      - responded_at (timestamp)
      - created_at (timestamp)
    
    - support_tickets
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - subject (text)
      - message (text)
      - status (text)
      - response (text)
      - responded_at (timestamp)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for each table
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  city text,
  role text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Repair Requests table
CREATE TABLE IF NOT EXISTS repair_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id uuid REFERENCES users(id),
  appliance_type text NOT NULL,
  brand text NOT NULL,
  issue_description text NOT NULL,
  address text NOT NULL,
  preferred_date_time timestamptz NOT NULL,
  assigned_shop_id uuid REFERENCES users(id),
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Deliveries table
CREATE TABLE IF NOT EXISTS deliveries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id uuid REFERENCES repair_requests(id),
  assigned_partner_id uuid REFERENCES users(id),
  pickup_time timestamptz,
  delivery_status text NOT NULL DEFAULT 'pending',
  tracking_details text,
  delivery_fee numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id uuid REFERENCES repair_requests(id),
  amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  method text NOT NULL,
  payment_date timestamptz,
  transaction_id text,
  created_at timestamptz DEFAULT now()
);

-- Complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id),
  type text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  response text,
  responded_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Support Tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id),
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  response text,
  responded_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE repair_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policies for repair_requests table
CREATE POLICY "Customers can view their own requests"
  ON repair_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = customer_id);

CREATE POLICY "Service providers can view assigned requests"
  ON repair_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = assigned_shop_id);

-- Policies for deliveries table
CREATE POLICY "Delivery partners can view assigned deliveries"
  ON deliveries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = assigned_partner_id);

-- Policies for complaints and support_tickets
CREATE POLICY "Users can view their own complaints"
  ON complaints
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own support tickets"
  ON support_tickets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admin policies (using service_role)
CREATE POLICY "Admins can view all data"
  ON users
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Admins can manage all requests"
  ON repair_requests
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Admins can manage all deliveries"
  ON deliveries
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Admins can view all payments"
  ON payments
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Admins can manage all complaints"
  ON complaints
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Admins can manage all support tickets"
  ON support_tickets
  FOR ALL
  TO service_role
  USING (true);