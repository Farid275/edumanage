export function MetricCard({ title, value, icon }) {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow px-5 py-[22px] min-h-[132px] flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <p className="font-label-md text-[13px] font-medium text-[var(--color-on-surface-variant)]">{title}</p>
        <span className="material-symbols-outlined text-[18px] text-[var(--color-outline)] opacity-80">
          {icon}
        </span>
      </div>
      <p className="font-display-md text-[28px] font-bold text-[var(--color-on-surface)] leading-tight">{value}</p>
    </div>
  );
}
