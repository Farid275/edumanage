import { Link, useLocation } from 'react-router';
import { NAVIGATION } from '../../config/navigation';

export function Sidebar({ role = 'admin' }) {
  const location = useLocation();
  const links = NAVIGATION[role] || [];

  return (
    <aside className="hidden md:flex flex-col bg-[var(--color-academic-navy)] text-[var(--color-primary-fixed-dim)] font-label-md text-label-md w-72 h-full fixed left-0 top-0 overflow-y-auto z-50 transition-all duration-200 ease-in-out">
      <div className="px-6 py-8 flex items-center gap-3 border-b border-white/10 mb-4">
        {/* Text fallback until logo is provided */}
        <div className="w-8 h-8 rounded bg-[var(--color-muted-gold)] flex items-center justify-center text-[var(--color-academic-navy)] font-bold">EM</div>
        <div>
          <h1 className="font-headline-md text-headline-md font-bold text-white leading-tight">EduManage</h1>
          <p className="font-caption text-caption text-white/80">Academic Excellence</p>
        </div>
      </div>
      <nav className="flex flex-col gap-2 py-6 px-4 flex-1">
        {links.map(link => {
          const isActive = location.pathname.startsWith(link.path);
          return (
            <Link
              key={link.id}
              to={link.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 ease-in-out w-full text-left
                ${isActive 
                  ? 'text-[var(--color-muted-gold)] bg-white/5 border-l-4 border-[var(--color-muted-gold)]' 
                  : 'text-white/70 hover:text-white hover:bg-white/10 border-l-4 border-transparent'}`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
