export function GradeDistribution() {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-6 mb-8">
      <div className="mb-4 border-b border-[var(--color-outline-variant)] pb-4">
        <h3 className="font-headline-sm text-base font-semibold text-[var(--color-on-surface)]">Grade Distribution</h3>
        <p className="font-body-sm text-xs text-[var(--color-on-surface-variant)] mt-0.5">Overview of student performance for selected assignments.</p>
      </div>
      
      <div className="py-12 flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-[28px] text-[var(--color-outline)] opacity-50 mb-3" aria-hidden="true">
          bar_chart
        </span>
        <p className="font-body-md text-sm font-medium text-[var(--color-on-surface-variant)] max-w-sm">
          Grade distribution will appear when student grades are available.
        </p>
      </div>
    </div>
  );
}
