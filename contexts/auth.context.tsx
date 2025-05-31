import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { account } from '@/lib/auth';
import type { Models } from 'react-native-appwrite';
import { router } from 'expo-router';
import { ID } from 'react-native-appwrite';

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  loggedInUser: Models.User<Models.Preferences> | null;
  setLoggedInUser: (user: Models.User<Models.Preferences> | null) => void;
  error: string;
  setError: (error: string) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
  loggedInUser: null,
  setLoggedInUser: () => {},
  error: '',
  setError: () => {},
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [error, setError] = useState('');

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      setError('');
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setLoggedInUser(user);
      setIsAuthenticated(true);
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  }

  async function register(email: string, password: string, name: string) {
    try {
      setLoading(true);
      setError('');
      await account.create(ID.unique(), email, password, name);
      await login(email, password);
      
      // Update user preferences
      try {
        const response = await account.updatePrefs({defaultTheme: 'light', isOnboarded: false});
        console.log('Preferences updated:', response);
      } catch (prefError) {
        console.log('Failed to update preferences:', prefError);
      }
      
      router.replace('/onboarding');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      setError('');
      await account.deleteSession('current');
      setLoggedInUser(null);
      setIsAuthenticated(false);
      router.replace('/auth');
    } catch (err: any) {
      setError(err.message || 'Failed to logout');
    } finally {
      setLoading(false);
    }
  }

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

        const user = await account.get();
        setLoggedInUser(user);
        setIsAuthenticated(!!session);
      } catch (err: any) {
        if (isMounted) {
          setIsAuthenticated(false);
          setLoggedInUser(null);
          setError(err.message || 'Failed to validate session');
        }
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
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        loading, 
        loggedInUser, 
        setLoggedInUser,
        error,
        setError,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
