import { Outlet } from 'react-router-dom';

export function DashboardLayout() {
  return (
    <div>
      <header>Header</header>

      <main>
        <aside>Sidebar</aside>

        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
}