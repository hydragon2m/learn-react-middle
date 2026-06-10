import { Navigate, Outlet } from 'react-router-dom';

import { ROUTE_PATH } from '@/app/router/route-path';
import { useAuthStore } from '@/shared/stores/auth.store';

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_PATH.LOGIN} replace />;
  }

  return <Outlet />;
}