import { createContext, useContext } from 'react';
import type { User } from '@/types/entities';

export const STORAGE_KEY = 'blogify-user';

export interface AuthContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

/** Reads the current user from context. Throws outside <AuthProvider>. */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
