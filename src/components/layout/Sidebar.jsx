import { Link, useLocation } from 'react-router';
import { NAVIGATION } from '../../config/navigation';

export function Sidebar({ role = 'admin', isOpen, onClose }) {
  const location = useLocation();
  const links = NAVIGATION[role] || [];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      <aside className={`flex flex-col bg-[var(--color-sidebar)] text-[var(--color-sidebar-text)] font-label-md text-label-md w-64 h-full fixed left-0 top-0 overflow-y-auto z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-xl md:shadow-none`}>
        <div className="px-6 py-5 flex items-center justify-between border-b border-white/10 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[var(--color-sidebar-active-icon)] flex items-center justify-center text-[var(--color-sidebar)] font-bold text-sm tracking-wider shrink-0">EM</div>
            <div className="flex flex-col min-w-0">
              <h1 className="font-headline-md text-headline-md font-bold text-[var(--color-sidebar-active-text)] leading-tight tracking-tight truncate">EduManage</h1>
            </div>
          </div>
          <button className="md:hidden text-white/70 hover:text-white" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex flex-col gap-1 py-4 px-4 flex-1">
          {links.map(link => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path + '/'));
            return (
              <Link
                key={link.id}
                to={link.path}
                onClick={() => onClose && onClose()}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ease-in-out w-full text-left focus:outline-none
                  ${isActive 
                    ? 'bg-[var(--color-sidebar-active)] text-[var(--color-sidebar-active-text)] font-medium' 
                    : 'bg-transparent text-[var(--color-sidebar-text)] hover:text-[var(--color-sidebar-active-text)] hover:bg-[var(--color-sidebar-hover)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]'}`}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[var(--color-sidebar-active-icon)]' : ''}`}>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
