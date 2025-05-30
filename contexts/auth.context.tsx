import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { account } from '@/lib/auth';
import type { Models } from 'react-native-appwrite';

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ isAuthenticated: false, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const validateSession = async () => {
      try {
        const timeout = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), 2000)
        );
        const session = await Promise.race<Models.Session>([
          account.getSession('current'),
          timeout,
        ]);

        if (!isMounted) return;

        console.log(session.provider);
        console.log(session.providerUid);
        console.log(session.providerAccessToken);
        setIsAuthenticated(!!session);
      } catch {
        if (isMounted) setIsAuthenticated(false);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    validateSession();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
