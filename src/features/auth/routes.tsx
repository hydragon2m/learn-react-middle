import type { RouteObject } from 'react-router-dom';
import { LoginPage } from './pages/login-page';
import { ROUTE_PATH } from '@/app/router/route-path';

export const authRoutes: RouteObject[] = [
  {
    path: ROUTE_PATH.LOGIN,
    element: <LoginPage />,
  },
];
