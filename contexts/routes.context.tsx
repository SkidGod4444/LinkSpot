import React, { createContext, useEffect, useContext } from 'react';
import { usePathname, useRouter } from 'expo-router';
import { useAuth } from './auth.context';
import { account } from '@/lib/auth';

interface RouteGuardContextValue {
  isProtectedRoute: boolean;
  isCheckingAuth: boolean;
}

const RouteGuardContext = createContext<RouteGuardContextValue | undefined>(undefined);

const ProtectedRoutes = ['/profile', '/explore', '/'];

export const RouteProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  const isProtectedRoute = ProtectedRoutes.includes(pathname);
  const isCheckingAuth = loading || (isProtectedRoute && !isAuthenticated);

  useEffect(() => {
    if (!isProtectedRoute || loading) return;

    if (!isAuthenticated) {
      console.log('User not authenticated — redirecting to /auth');
      router.replace('/auth');
      return;
    }

    // Only check onboarding if user is authenticated and at root route
    if (pathname === '/') {
      account.getPrefs()
        .then((prefs) => {
          console.log('User preferences:', prefs);
          if (prefs?.isOnboarded === 'false') {
            console.log('User not onboarded — redirecting to /onboarding');
            router.replace('/onboarding');
          }
        })
        .catch((err) => {
          console.error('Error fetching user preferences:', err);
        });
    }
  }, [pathname, isAuthenticated, loading, router, isProtectedRoute]);

  return (
    <RouteGuardContext.Provider value={{ isProtectedRoute, isCheckingAuth }}>
      {children}
    </RouteGuardContext.Provider>
  );
};

// Optional hook to consume this context elsewhere
export const useRouteGuard = () => {
  const context = useContext(RouteGuardContext);
  if (!context) {
    throw new Error('useRouteGuard must be used within a RouteProvider');
  }
  return context;
};