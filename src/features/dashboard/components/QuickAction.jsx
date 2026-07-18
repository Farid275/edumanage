export function QuickAction({ icon, label }) {
  return (
    <button className="flex items-center gap-2.5 px-4 h-14 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] hover:bg-[var(--color-surface-container-low)] hover:border-[var(--color-outline)] transition-colors w-full text-left group">
      <span className="material-symbols-outlined text-[18px] text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-academic-navy)] transition-colors">
        {icon}
      </span>
      <span className="font-label-md text-[13px] font-medium text-[var(--color-on-surface)]">{label}</span>
    </button>
  );
}
