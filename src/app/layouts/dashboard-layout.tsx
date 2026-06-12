import { Outlet } from 'react-router-dom';
import { Header } from '@/shared/components/header';

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex">
        <aside className="border-r border-border p-4 w-64">Sidebar</aside>

        <section className="flex-1 p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
