export function ReportEmptyState({ message = 'Report data will appear when academic records are available.', icon = 'analytics' }) {
  return (
    <div className="w-full max-w-[360px] min-w-0 mx-auto flex flex-col items-center justify-center gap-3 text-center">
      <span className="inline-flex items-center justify-center flex-none material-symbols-outlined text-[28px] text-[var(--color-outline)] opacity-50" aria-hidden="true">
        {icon}
      </span>
      <p className="w-full m-0 text-sm font-medium text-[var(--color-on-surface-variant)] leading-relaxed whitespace-normal">
        {message}
      </p>
    </div>
  );
}
