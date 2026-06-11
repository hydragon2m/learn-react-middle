import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren, useEffect } from 'react';

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

    // Điều kiện gọi API profile để phục hồi session:
    // 1. Chế độ Cookie: Luôn gọi vì token nằm trong cookie ẩn.
    // 2. Chế độ Token: Chỉ gọi khi đã có sẵn accessToken trong localStorage.
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
      // Chế độ Token nhưng chưa đăng nhập
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
        <AuthInitializer>{children}</AuthInitializer>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
