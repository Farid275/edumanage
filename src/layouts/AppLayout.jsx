import { useState } from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      <Sidebar 
        role="admin" 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      <div className="flex-1 md:ml-64 flex flex-col relative transition-all duration-300">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="pt-24 pb-12 px-4 sm:px-6 md:px-10 w-full max-w-[1440px] mx-auto flex-1 flex flex-col gap-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
