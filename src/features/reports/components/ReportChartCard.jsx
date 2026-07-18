import { ReportEmptyState } from './ReportEmptyState';

export function ReportChartCard({ title, description, emptyMessage, emptyIcon = 'bar_chart' }) {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-6 h-full flex flex-col">
      <div className="mb-4 pb-4 border-b border-[var(--color-outline-variant)]">
        <h3 className="font-headline-sm text-base font-semibold text-[var(--color-on-surface)]">{title}</h3>
        {description && (
          <p className="font-body-sm text-xs text-[var(--color-on-surface-variant)] mt-0.5">{description}</p>
        )}
      </div>
      <div className="flex-1 w-full min-h-[260px] flex items-center justify-center p-8 relative">
         {/* Decorative grid structure behind the empty state to suggest a chart area */}
         <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-[0.03] pointer-events-none">
            {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="border-[var(--color-on-surface)] border-[0.5px]"></div>
            ))}
         </div>
         <div className="relative z-10 w-full">
            <ReportEmptyState message={emptyMessage} icon={emptyIcon} />
         </div>
      </div>
    </div>
  );
}
