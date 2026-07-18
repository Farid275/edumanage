export function Topbar({ onMenuClick }) {
  return (
    <header className="bg-[var(--color-surface)]/95 backdrop-blur-md text-[var(--color-on-surface)] h-16 fixed top-0 right-0 left-0 md:left-64 z-30 border-b border-[var(--color-outline-variant)] flex items-center justify-between px-4 md:px-8 transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-[var(--color-on-surface-variant)] rounded-full hover:bg-[var(--color-surface-container-high)] transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="hidden md:block">
          <h2 className="font-title-md text-title-md font-semibold text-[var(--color-on-surface)]">Portal Overview</h2>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <button className="p-2 text-[var(--color-on-surface-variant)] rounded-full hover:bg-[var(--color-surface-container-high)] transition-colors relative">
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[var(--color-error)] rounded-full border-2 border-[var(--color-surface)]"></span>
        </button>
        <button className="p-2 text-[var(--color-on-surface-variant)] rounded-full hover:bg-[var(--color-surface-container-high)] transition-colors hidden sm:block">
          <span className="material-symbols-outlined text-[22px]">help</span>
        </button>
        <div className="h-6 w-px bg-[var(--color-outline-variant)] mx-2 hidden sm:block"></div>
        <button className="flex items-center gap-2 p-1 pl-2 pr-1 rounded-full border border-transparent hover:bg-[var(--color-surface-container-high)] transition-all">
          <span className="hidden sm:block text-sm font-medium text-[var(--color-on-surface)] mr-1">Admin User</span>
          <div className="w-8 h-8 rounded-full bg-[var(--color-academic-navy)] text-[var(--color-soft-white)] flex items-center justify-center font-label-sm font-bold text-xs shadow-sm">
            AU
          </div>
        </button>
      </div>
    </header>
  );
}
