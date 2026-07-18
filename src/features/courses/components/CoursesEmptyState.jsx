export function CoursesEmptyState() {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center gap-2">
      <span className="material-symbols-outlined text-[28px] text-[var(--color-outline)] opacity-50 mb-1">
        menu_book
      </span>
      <p className="font-body-md text-sm font-medium text-[var(--color-on-surface-variant)]">
        No courses are available yet.
      </p>
      <p className="font-body-sm text-xs text-[var(--color-outline)]">
        Courses created by administrators will appear here.
      </p>
    </div>
  );
}
