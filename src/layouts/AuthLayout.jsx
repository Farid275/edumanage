import { Outlet } from 'react-router';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-warm-ivory)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded mb-4 bg-[var(--color-muted-gold)] flex items-center justify-center text-[var(--color-academic-navy)] font-bold text-2xl">EM</div>
          <h1 className="font-headline-md text-headline-md font-bold text-[var(--color-academic-navy)] mb-2">EduManage</h1>
          <p className="font-caption text-caption text-[var(--color-on-surface-variant)]">Academic Excellence Platform</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
