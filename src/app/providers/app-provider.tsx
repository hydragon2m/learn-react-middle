import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren, useEffect } from 'react';
import { Toaster } from 'sonner';

import { getProfileApi } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import { ErrorBoundary } from '@/shared/components/error-boundary';
import { isCookieAuthMode } from '@/shared/config/auth-mode';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30 * 1000,
    },
  },
});

function AuthSessionBootstrap({ children }: PropsWithChildren) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAuth = useAuthStore((state) => state.setAuth);
  const setLoading = useAuthStore((state) => state.setLoading);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!isCookieAuthMode && !accessToken) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function bootstrapSession() {
      setLoading(true);

      try {
        const profile = await getProfileApi();

        if (isMounted) {
          setAuth({ user: profile.user });
        }
      } catch {
        if (isMounted) {
          logout();
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void bootstrapSession();

    return () => {
      isMounted = false;
    };
  }, [accessToken, logout, setAuth, setLoading]);

  return children;
}

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthSessionBootstrap>{children}</AuthSessionBootstrap>
        <Toaster position="top-right" richColors closeButton />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
