import React, { createContext, useEffect, useState, ReactNode } from "react";
import { getToken, saveToken, deleteToken } from "../utils/tokenStorage";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import App from "../App";

interface DecodedToken {
  role?: string;
}

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

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = await getToken();
      if (storedToken) {
        setToken(storedToken);
        try {
          const decoded = jwtDecode<DecodedToken>(storedToken);
          setUserRole(decoded.role ?? null);
        } catch (error) {
          console.error("Failed to decode token:", error);
          setUserRole(null);
        }
      }
    };
    initAuth();
  }, []);

  const login = async (newToken: string) => {
    await saveToken(newToken);
    setToken(newToken);
    try {
      const decoded = jwtDecode<DecodedToken>(newToken);
      setUserRole(decoded.role ?? null);
    } catch (error) {
      console.error("Failed to decode token:", error);
      setUserRole(null);
    }
    router("/(AuthVerifiedLayout)/VerifiedAuthMainLayout");
  };

  const logout = async () => {
    await deleteToken();
    setToken(null);
    setUserRole(null);
    alert("Logged out. You have been successfully logged out.");
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
      <App />
    </AuthContext.Provider>
  );
};
