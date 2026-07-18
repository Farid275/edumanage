export function QuickAction({ icon, label }) {
  return (
    <button className="flex items-center gap-3 p-4 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] hover:bg-[var(--color-surface-container-low)] hover:border-[var(--color-outline)] transition-colors w-full text-left group">
      <span className="material-symbols-outlined text-[20px] text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-academic-navy)] transition-colors">
        {icon}
      </span>
      <span className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">{label}</span>
    </button>
  );
}
