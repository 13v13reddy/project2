/*
  # Initial Schema Setup for Visitor Management System

  1. New Tables
    - `users`
      - System users (admins, hosts, security)
      - Includes role-based access control
    - `locations`
      - Physical locations/offices
      - Tracks capacity and status
    - `visitors`
      - Visitor information and status
    - `visitor_logs`
      - Check-in/out records
      - Tracks visitor movement

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
    - Secure visitor data access
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'host', 'security')),
  department text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  country text NOT NULL,
  capacity integer NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create visitors table
CREATE TABLE IF NOT EXISTS visitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text,
  purpose text NOT NULL,
  host_id uuid REFERENCES users(id),
  photo_url text,
  document_url text,
  status text NOT NULL CHECK (status IN ('pre_registered', 'checked_in', 'checked_out', 'canceled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create visitor_logs table
CREATE TABLE IF NOT EXISTS visitor_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id uuid REFERENCES visitors(id) NOT NULL,
  host_id uuid REFERENCES users(id) NOT NULL,
  location_id uuid REFERENCES locations(id) NOT NULL,
  check_in_time timestamptz NOT NULL,
  check_out_time timestamptz,
  status text NOT NULL CHECK (status IN ('expected', 'checked_in', 'checked_out', 'canceled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can manage all users"
  ON users
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- RLS Policies for locations
CREATE POLICY "Anyone can read active locations"
  ON locations
  FOR SELECT
  TO authenticated
  USING (active = true);

CREATE POLICY "Admins can manage locations"
  ON locations
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- RLS Policies for visitors
CREATE POLICY "Hosts can read their visitors"
  ON visitors
  FOR SELECT
  TO authenticated
  USING (host_id = auth.uid());

CREATE POLICY "Security can read all visitors"
  ON visitors
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('security', 'admin'));

-- RLS Policies for visitor_logs
CREATE POLICY "Hosts can read their visitor logs"
  ON visitor_logs
  FOR SELECT
  TO authenticated
  USING (host_id = auth.uid());

CREATE POLICY "Security can read all visitor logs"
  ON visitor_logs
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('security', 'admin'));