import { Outlet } from 'react-router-dom';
import { Header } from '@/shared/components/header';

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
