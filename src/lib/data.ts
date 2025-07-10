// Mock data for the rental management system

export interface Property {
  id: string;
  name: string;
  address: string;
  type: 'apartment' | 'house' | 'condo' | 'commercial';
  bedrooms: number;
  bathrooms: number;
  rent: number;
  status: 'vacant' | 'occupied' | 'maintenance';
  description: string;
  amenities: string[];
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  leaseStart: string;
  leaseEnd: string;
  rentAmount: number;
  deposit: number;
  status: 'active' | 'inactive' | 'pending';
}

export interface Payment {
  id: string;
  tenantId: string;
  propertyId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  type: 'rent' | 'deposit' | 'fee';
  description: string;
}

export interface Invoice {
  id: string;
  tenantId: string;
  propertyId: string;
  amount: number;
  dueDate: string;
  issueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  items: {
    description: string;
    amount: number;
  }[];
}

// Mock data
export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Sunset Apartments Unit 101',
    address: '123 Main St, Unit 101, City, State 12345',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    rent: 1200,
    status: 'occupied',
    description: 'Beautiful 2-bedroom apartment with modern amenities',
    amenities: ['Parking', 'Gym', 'Pool', 'Laundry']
  },
  {
    id: '2',
    name: 'Oak Street House',
    address: '456 Oak St, City, State 12345',
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    rent: 1800,
    status: 'occupied',
    description: 'Spacious family home with backyard',
    amenities: ['Garage', 'Garden', 'Fireplace']
  },
  {
    id: '3',
    name: 'Downtown Loft',
    address: '789 Central Ave, Unit 504, City, State 12345',
    type: 'condo',
    bedrooms: 1,
    bathrooms: 1,
    rent: 1500,
    status: 'vacant',
    description: 'Modern loft in the heart of downtown',
    amenities: ['Balcony', 'City View', 'Concierge']
  }
];

export const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@email.com',
    phone: '(555) 123-4567',
    propertyId: '1',
    leaseStart: '2024-01-01',
    leaseEnd: '2024-12-31',
    rentAmount: 1200,
    deposit: 2400,
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@email.com',
    phone: '(555) 987-6543',
    propertyId: '2',
    leaseStart: '2024-03-01',
    leaseEnd: '2025-02-28',
    rentAmount: 1800,
    deposit: 3600,
    status: 'active'
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    tenantId: '1',
    propertyId: '1',
    amount: 1200,
    dueDate: '2024-01-01',
    paidDate: '2024-01-01',
    status: 'paid',
    type: 'rent',
    description: 'January 2024 Rent'
  },
  {
    id: '2',
    tenantId: '1',
    propertyId: '1',
    amount: 1200,
    dueDate: '2024-02-01',
    status: 'overdue',
    type: 'rent',
    description: 'February 2024 Rent'
  },
  {
    id: '3',
    tenantId: '2',
    propertyId: '2',
    amount: 1800,
    dueDate: '2024-01-01',
    paidDate: '2024-01-01',
    status: 'paid',
    type: 'rent',
    description: 'January 2024 Rent'
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    tenantId: '1',
    propertyId: '1',
    amount: 1200,
    dueDate: '2024-03-01',
    issueDate: '2024-02-15',
    status: 'pending',
    items: [
      { description: 'Monthly Rent - March 2024', amount: 1200 }
    ]
  },
  {
    id: '2',
    tenantId: '2',
    propertyId: '2',
    amount: 1850,
    dueDate: '2024-03-01',
    issueDate: '2024-02-15',
    status: 'pending',
    items: [
      { description: 'Monthly Rent - March 2024', amount: 1800 },
      { description: 'Late Fee', amount: 50 }
    ]
  }
];