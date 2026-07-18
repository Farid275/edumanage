export function MaterialsEmptyState() {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center gap-2">
      <span className="material-symbols-outlined text-[28px] text-[var(--color-outline)] opacity-50 mb-1" aria-hidden="true">
        snippet_folder
      </span>
      <p className="font-body-md text-sm font-medium text-[var(--color-on-surface-variant)]">
        No learning materials are available yet.
      </p>
      <p className="font-body-sm text-xs text-[var(--color-outline)]">
        Materials shared by lecturers or administrators will appear here.
      </p>
    </div>
  );
}
