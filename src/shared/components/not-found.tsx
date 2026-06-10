import { Link } from 'react-router-dom';

import { ROUTE_PATH } from '@/app/router/route-path';

export function NotFound() {
  return (
    <main>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to={ROUTE_PATH.HOME}>Back to home</Link>
    </main>
  );
}