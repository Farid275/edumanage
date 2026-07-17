export function Topbar() {
  return (
    <header className="bg-[var(--color-surface)]/95 backdrop-blur-sm text-[var(--color-primary)] font-title-lg text-title-lg h-20 fixed top-0 right-0 md:left-72 z-40 border-b border-[var(--color-outline-variant)] flex items-center justify-between px-8 w-full md:w-[calc(100%-18rem)] transition-all duration-200 ease-in-out">
      <div className="hidden md:block">
        <h2 className="font-title-lg text-title-lg font-bold text-[var(--color-primary)]">Portal</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-[var(--color-on-surface-variant)] rounded-full hover:bg-[var(--color-surface-container-high)] transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 text-[var(--color-on-surface-variant)] rounded-full hover:bg-[var(--color-surface-container-high)] transition-colors hidden sm:block">
          <span className="material-symbols-outlined">help_outline</span>
        </button>
        <div className="h-8 w-px bg-[var(--color-outline-variant)] mx-2 hidden sm:block"></div>
        <button className="flex items-center gap-2 p-1 rounded-full hover:bg-[var(--color-surface-container-high)] transition-colors">
          <div className="w-10 h-10 rounded-full bg-[var(--color-academic-navy)] text-[var(--color-soft-white)] flex items-center justify-center font-label-md font-bold">
            U
          </div>
        </button>
      </div>
    </header>
  );
}
