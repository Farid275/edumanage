import { Outlet } from 'react-router';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[var(--color-surface)]">
      <Sidebar role="admin" />
      <div className="flex-1 md:ml-72 flex flex-col relative">
        <Topbar />
        <main className="pt-28 pb-12 px-4 sm:px-6 md:px-10 w-full max-w-[1280px] mx-auto flex-1 flex flex-col gap-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
