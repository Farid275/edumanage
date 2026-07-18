export function StudentsEmptyState() {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center gap-2">
      <span className="material-symbols-outlined text-[28px] text-[var(--color-outline)] opacity-50 mb-1" aria-hidden="true">
        groups
      </span>
      <p className="font-body-md text-sm font-medium text-[var(--color-on-surface-variant)]">
        No student records are available yet.
      </p>
      <p className="font-body-sm text-xs text-[var(--color-outline)]">
        Students added by administrators will appear here.
      </p>
    </div>
  );
}
