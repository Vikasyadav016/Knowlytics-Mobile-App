import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { getToken, saveToken, deleteToken } from '../utils/tokenStorage';
import {jwtDecode} from 'jwt-decode';
import { Alert } from 'react-native';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = await getToken();
      if (storedToken) {
        setToken(storedToken);
        const decoded: any = jwtDecode(storedToken);
        setUserRole(decoded.role || null);
      }
    };
    initAuth();
  }, []);

  const login = async (newToken: string) => {
    await saveToken(newToken);
    setToken(newToken);
    const decoded: any = jwtDecode(newToken);
    setUserRole(decoded.role || null);
  };

  const logout = async () => {
    await deleteToken();
    setToken(null);
    setUserRole(null);
    Alert.alert('Logged out', 'You have been successfully logged out.');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        userRole,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
