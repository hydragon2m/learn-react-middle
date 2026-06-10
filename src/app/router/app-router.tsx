import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthLayout } from '@/app/layouts/auth-layout';
import { DashboardLayout } from '@/app/layouts/dashboard-layout';
import { ProtectedRoute } from '@/app/router/protected-route';
import { ROUTE_PATH } from '@/app/router/route-path';
import { LoginPage } from '@/features/auth/pages/login-page';
import { HomePage } from '@/features/home/pages/home-page';
import { NotFound } from '@/shared/components/not-found';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTE_PATH.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: ROUTE_PATH.HOME,
            element: <HomePage />,
          },
        ],
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