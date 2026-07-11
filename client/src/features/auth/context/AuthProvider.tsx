import { useCallback, useState, type ReactNode } from 'react';
import type { User } from '@/types/entities';
import { AuthContext, STORAGE_KEY } from './AuthContext';

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

/**
 * Tracks the current user. With HTTP-only cookie auth the client can't read
 * the token, so we persist only the (non-sensitive) user object as the source
 * of "who is logged in". Queries revalidate the real session on demand.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(readStoredUser);

  const setUser = useCallback((next: User | null) => {
    setUserState(next);
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated: Boolean(user) }}
    >
      {children}
    </AuthContext.Provider>
  );
}
