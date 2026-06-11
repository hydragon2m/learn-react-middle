import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthLayout } from '@/app/layouts/auth-layout';
import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { ProtectedRoute } from '@/app/router/protected-route';
import { authRoutes } from '@/features/auth/routes';
import { homeRoutes } from '@/features/home/routes';
import { NotFound } from '@/shared/components/not-found';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: authRoutes,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: homeRoutes,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}