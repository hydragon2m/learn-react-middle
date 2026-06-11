import type { RouteObject } from 'react-router-dom';
import { HomePage } from './pages/home-page';
import { ROUTE_PATH } from '@/app/router/route-path';

export const homeRoutes: RouteObject[] = [
  {
    path: ROUTE_PATH.HOME,
    element: <HomePage />,
  },
];
