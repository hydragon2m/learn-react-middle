import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren, useEffect } from 'react';
import { Toaster } from 'sonner';

import { getProfileApi } from '@/features/auth/api/auth.api';
import { ErrorBoundary } from '@/shared/components/error-boundary';
import { LoadingScreen } from '@/shared/components/loading-screen';
import { useAuthStore } from '@/shared/stores/auth.store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30 * 1000,
    },
  },
});

function AuthInitializer({ children }: PropsWithChildren) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);
  const isLoading = useAuthStore((state) => state.isLoading);
  const setLoading = useAuthStore((state) => state.setLoading);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const isCookieMode = import.meta.env.VITE_AUTH_MODE === 'cookie';

    if (isCookieMode || accessToken) {
      getProfileApi()
        .then((data) => {
          setAuth({
            user: data.user,
            accessToken: accessToken || undefined,
          });
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [setAuth, logout, setLoading, accessToken]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthInitializer>
          {children}
          {/* Toast notifications – dùng: import { toast } from 'sonner'; toast.success('...') */}
          <Toaster position="top-right" richColors closeButton />
        </AuthInitializer>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
