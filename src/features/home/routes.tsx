import type { RouteObject } from 'react-router-dom';

import { ROUTE_PATH } from '@/app/router/route-path';

import { HomePage } from './pages/home-page';

export const homeRoutes: RouteObject[] = [
  {
    path: ROUTE_PATH.HOME,
    element: <HomePage />,
  },
];
