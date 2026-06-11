import type { RouteObject } from 'react-router-dom';

import { ROUTE_PATH } from '@/app/router/route-path';

import { LoginPage } from './pages/login-page';
import { RegisterPage } from './pages/register-page';

export const authRoutes: RouteObject[] = [
  {
    path: ROUTE_PATH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTE_PATH.REGISTER,
    element: <RegisterPage />,
  },
];
