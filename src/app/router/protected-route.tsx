import { Navigate, Outlet } from 'react-router-dom';

import { ROUTE_PATH } from '@/app/router/route-path';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import { LoadingScreen } from '@/shared/components/loading-screen';

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_PATH.LOGIN} replace />;
  }

  return <Outlet />;
}
