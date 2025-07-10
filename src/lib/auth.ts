// Authentication context and utilities
import { createContext, useContext } from 'react';

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'tenant';
  name: string;
  tenantId?: string; // For tenant users
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'admin' | 'tenant') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demonstration
export const mockUsers = [
  {
    id: '1',
    email: 'admin@rental.com',
    password: 'admin123',
    role: 'admin' as const,
    name: 'Admin User'
  },
  {
    id: '2',
    email: 'john@email.com',
    password: 'tenant123',
    role: 'tenant' as const,
    name: 'John Smith',
    tenantId: '1'
  },
  {
    id: '3',
    email: 'jane@email.com',
    password: 'tenant123',
    role: 'tenant' as const,
    name: 'Jane Doe',
    tenantId: '2'
  }
];