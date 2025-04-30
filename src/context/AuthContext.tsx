import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('currentUser', null);
  const [users, setUsers] = useLocalStorage<User[]>('users', []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize with admin user if no users exist
    if (users.length === 0) {
      const adminUser: User = {
        id: 'admin-1',
        fullName: 'Admin User',
        email: 'admin@servease.com',
        password: 'admin123',
        phone: '1234567890',
        city: 'Admin City',
        role: 'admin',
        createdAt: new Date(),
      };
      setUsers([adminUser]);
    }
    setLoading(false);
  }, [users, setUsers]);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find(
          (u) => u.email === email && u.password === password && u.role === role
        );
        
        if (user) {
          setCurrentUser(user);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  const signup = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const emailExists = users.some((u) => u.email === userData.email);
        
        if (emailExists) {
          resolve(false);
        } else {
          const newUser: User = {
            ...userData,
            id: `user-${Date.now()}`,
            createdAt: new Date(),
          };
          
          setUsers([...users, newUser]);
          setCurrentUser(newUser);
          resolve(true);
        }
      }, 500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};