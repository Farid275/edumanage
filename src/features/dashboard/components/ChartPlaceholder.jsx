export function ChartPlaceholder({ label, message = 'Data will appear when academic records are available.' }) {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-5 h-64 flex flex-col">
      {label && (
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-label-md text-[13px] font-medium text-[var(--color-on-surface-variant)]">{label}</h4>
          <span className="material-symbols-outlined text-[16px] text-[var(--color-outline)] opacity-60">
            show_chart
          </span>
        </div>
      )}
      <div className={`flex-1 flex flex-col relative ${label ? 'justify-end' : 'justify-center items-center'}`}>
        {/* Faint horizontal grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-2">
          <div className="border-b border-[var(--color-outline-variant)]/30" />
          <div className="border-b border-[var(--color-outline-variant)]/30" />
          <div className="border-b border-[var(--color-outline-variant)]/30" />
          <div className="border-b border-[var(--color-outline-variant)]/20" />
        </div>
        <p className={`text-xs text-[var(--color-outline)] text-center relative z-10 ${label ? 'pb-2' : ''}`}>
          {message}
        </p>
      </div>
    </div>
  );
}
