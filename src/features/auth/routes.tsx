import type { RouteObject } from 'react-router-dom';

import { ROUTE_PATH } from '@/app/router/route-path';

import { LoginPage } from './pages/login-page';

export const authRoutes: RouteObject[] = [
  {
    path: ROUTE_PATH.LOGIN,
    element: <LoginPage />,
  },
];
