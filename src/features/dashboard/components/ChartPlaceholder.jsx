export function ChartPlaceholder({ label }) {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-6 h-72 flex flex-col">
      <div className="flex items-center justify-between">
        <h4 className="font-label-md text-sm font-medium text-[var(--color-on-surface-variant)]">{label}</h4>
        <span className="material-symbols-outlined text-[18px] text-[var(--color-outline)] opacity-70">
          show_chart
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center border-2 border-dashed border-[var(--color-outline-variant)]/50 rounded-lg mt-4">
        <p className="font-body-sm text-sm text-[var(--color-outline)]">Visualization Pending</p>
      </div>
    </div>
  );
}
