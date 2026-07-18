export function MetricCard({ title, value, icon }) {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="font-label-md text-sm font-medium text-[var(--color-on-surface-variant)]">{title}</p>
        <span className="material-symbols-outlined text-[20px] text-[var(--color-outline)]">
          {icon}
        </span>
      </div>
      <p className="font-display-md text-3xl font-bold text-[var(--color-on-surface)]">{value}</p>
    </div>
  );
}
