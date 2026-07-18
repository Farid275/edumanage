export function AttendanceEmptyState({ message = 'Select a course and session to manage attendance.', detail = 'Attendance records will appear after a course session is selected.' }) {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center gap-2">
      <span className="material-symbols-outlined text-[28px] text-[var(--color-outline)] opacity-50 mb-1" aria-hidden="true">
        fact_check
      </span>
      <p className="font-body-md text-sm font-medium text-[var(--color-on-surface-variant)]">
        {message}
      </p>
      <p className="font-body-sm text-xs text-[var(--color-outline)]">
        {detail}
      </p>
    </div>
  );
}
