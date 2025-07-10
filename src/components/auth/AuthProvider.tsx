import React, { useState, useEffect } from 'react';
import { AuthContext, User, mockUsers } from '@/lib/auth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on app load
    const storedAuth = localStorage.getItem('rental_auth');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setUser(parsedAuth);
      } catch (error) {
        localStorage.removeItem('rental_auth');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'admin' | 'tenant'): Promise<boolean> => {
    // Mock authentication
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password && u.role === role
    );

    if (foundUser) {
      const authUser: User = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
        name: foundUser.name,
        tenantId: foundUser.tenantId
      };
      
      setUser(authUser);
      localStorage.setItem('rental_auth', JSON.stringify(authUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rental_auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};