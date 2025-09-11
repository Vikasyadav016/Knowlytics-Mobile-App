// src/auth/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from './authProvider';

export const useAuth = () => {
  return useContext(AuthContext);
};
