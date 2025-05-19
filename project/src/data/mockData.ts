import { User, DashboardStats, VisitorLog, Location } from '../types';

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    department: 'Management',
    createdAt: '2023-01-15T08:30:00Z',
  },
  {
    id: '2',
    name: 'Host User',
    email: 'host@example.com',
    role: 'host',
    department: 'Marketing',
    createdAt: '2023-02-10T10:15:00Z',
  },
  {
    id: '3',
    name: 'Security User',
    email: 'security@example.com',
    role: 'security',
    createdAt: '2023-03-05T09:45:00Z',
  },
];

// Mock Locations
export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Headquarters',
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'USA',
    capacity: 500,
    active: true,
  },
  {
    id: '2',
    name: 'Regional Office',
    address: '456 Market Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    capacity: 250,
    active: true,
  },
  {
    id: '3',
    name: 'R&D Center',
    address: '789 Tech Parkway',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    country: 'USA',
    capacity: 150,
    active: true,
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  todayVisitors: 42,
  expectedVisitors: 65,
  checkedIn: 28,
  checkedOut: 14,
  visitorsByHour: [
    { hour: 8, count: 5 },
    { hour: 9, count: 10 },
    { hour: 10, count: 8 },
    { hour: 11, count: 6 },
    { hour: 12, count: 2 },
    { hour: 13, count: 4 },
    { hour: 14, count: 7 },
    { hour: 15, count: 8 },
    { hour: 16, count: 6 },
    { hour: 17, count: 2 },
  ],
  topHosts: [
    { hostId: '2', hostName: 'Sarah Johnson', count: 12 },
    { hostId: '5', hostName: 'Michael Chen', count: 8 },
    { hostId: '8', hostName: 'Emily Davis', count: 5 },
  ],
  visitorsByLocation: [
    { locationId: '1', locationName: 'Headquarters', count: 25 },
    { locationId: '2', locationName: 'Regional Office', count: 12 },
    { locationId: '3', locationName: 'R&D Center', count: 5 },
  ],
};

// Mock Visitor Logs
export const mockVisitorLogs: VisitorLog[] = [
  {
    id: '1',
    visitorId: '101',
    visitor: {
      id: '101',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      company: 'ABC Corp',
      purpose: 'Meeting with Marketing Team',
      hostId: '2',
      status: 'checked_in',
      checkInTime: new Date().toISOString(),
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    hostId: '2',
    host: mockUsers[1],
    locationId: '1',
    location: mockLocations[0],
    checkInTime: new Date().toISOString(),
    status: 'checked_in',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    visitorId: '102',
    visitor: {
      id: '102',
      name: 'Alice Brown',
      email: 'alice@example.com',
      phone: '+1 (555) 987-6543',
      company: 'XYZ Inc',
      purpose: 'Interview',
      hostId: '2',
      status: 'pre_registered',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    hostId: '2',
    host: mockUsers[1],
    locationId: '1',
    location: mockLocations[0],
    checkInTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Future date
    status: 'expected',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    visitorId: '103',
    visitor: {
      id: '103',
      name: 'Michael Davis',
      email: 'michael@example.com',
      phone: '+1 (555) 456-7890',
      company: 'Acme Ltd',
      purpose: 'Business Meeting',
      hostId: '1',
      status: 'checked_out',
      checkInTime: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      checkOutTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    hostId: '1',
    host: mockUsers[0],
    locationId: '2',
    location: mockLocations[1],
    checkInTime: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    checkOutTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    status: 'checked_out',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Generate more visitor logs for pagination example
for (let i = 4; i <= 20; i++) {
  const isCheckedOut = Math.random() > 0.5;
  const randomHost = mockUsers[Math.floor(Math.random() * mockUsers.length)];
  const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];
  
  const checkInTime = new Date(Date.now() - Math.floor(Math.random() * 72) * 60 * 60 * 1000);
  const checkOutTime = isCheckedOut 
    ? new Date(checkInTime.getTime() + Math.floor(Math.random() * 4) * 60 * 60 * 1000)
    : undefined;
  
  const status = isCheckedOut ? 'checked_out' : 'checked_in';
  
  mockVisitorLogs.push({
    id: `${i}`,
    visitorId: `${i + 100}`,
    visitor: {
      id: `${i + 100}`,
      name: `Visitor ${i}`,
      email: `visitor${i}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      company: `Company ${i}`,
      purpose: `Purpose ${i}`,
      hostId: randomHost.id,
      status: status as any,
      checkInTime: checkInTime.toISOString(),
      checkOutTime: checkOutTime?.toISOString(),
      createdAt: new Date(Date.now() - (i * 2) * 24 * 60 * 60 * 1000).toISOString(),
    },
    hostId: randomHost.id,
    host: randomHost,
    locationId: randomLocation.id,
    location: randomLocation,
    checkInTime: checkInTime.toISOString(),
    checkOutTime: checkOutTime?.toISOString(),
    status: status as any,
    createdAt: new Date(Date.now() - (i * 2) * 24 * 60 * 60 * 1000).toISOString(),
  });
}