import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for existing session on initial load
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('vms_user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser) as User;
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('vms_user');
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    // Simulate API request delay
    setTimeout(checkAuth, 800);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API request
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, we'll use mock data instead of actual API call
        const user = mockUsers.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && password === 'password'
        );

        if (user) {
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          localStorage.setItem('vms_user', JSON.stringify(user));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('vms_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}