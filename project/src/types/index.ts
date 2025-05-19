// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'host' | 'security';
  department?: string;
  location?: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Visitor related types
export interface Visitor {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  purpose: string;
  hostId: string;
  photoUrl?: string;
  documentUrl?: string;
  status: 'pre_registered' | 'checked_in' | 'checked_out' | 'canceled';
  checkInTime?: string;
  checkOutTime?: string;
  createdAt: string;
}

export interface VisitorLog {
  id: string;
  visitorId: string;
  visitor: Visitor;
  hostId: string;
  host: User;
  locationId: string;
  location: Location;
  checkInTime: string;
  checkOutTime?: string;
  status: 'expected' | 'checked_in' | 'checked_out' | 'canceled';
  createdAt: string;
}

// Location related types
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  capacity: number;
  active: boolean;
}

// Dashboard related types
export interface DashboardStats {
  todayVisitors: number;
  expectedVisitors: number;
  checkedIn: number;
  checkedOut: number;
  visitorsByHour: { hour: number; count: number }[];
  topHosts: { hostId: string; hostName: string; count: number }[];
  visitorsByLocation: { locationId: string; locationName: string; count: number }[];
}

// Form types
export interface LoginFormValues {
  email: string;
  password: string;
}

export interface VisitorFormValues {
  name: string;
  email: string;
  phone: string;
  company?: string;
  purpose: string;
  hostId: string;
  locationId: string;
  visitDate: string;
  agreeToTerms: boolean;
}