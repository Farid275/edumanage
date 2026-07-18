import { Button } from '../../../components/ui/Button';
import { AttendanceEmptyState } from './AttendanceEmptyState';

const columns = [
  { key: 'student', label: 'Student', width: 'min-w-[200px]' },
  { key: 'studentNumber', label: 'Student Number', width: 'w-[140px]' },
  { key: 'status', label: 'Attendance Status', width: 'w-[150px]' },
  { key: 'checkIn', label: 'Check-in Time', width: 'w-[130px]' },
  { key: 'notes', label: 'Notes', width: 'min-w-[160px]' },
  { key: 'actions', label: '', width: 'w-[60px]' },
];

export function AttendanceSessionPanel({ students = [] }) {
  const hasSession = false;

  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow overflow-hidden mb-8">
      {/* Session info header */}
      <div className="px-5 py-4 border-b border-[var(--color-outline-variant)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-headline-sm text-base font-semibold text-[var(--color-on-surface)]">Session Attendance</h3>
          <p className="font-body-sm text-xs text-[var(--color-on-surface-variant)] mt-0.5">Mark student attendance for the selected session.</p>
        </div>
        {hasSession && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="ghost" className="text-xs h-8 px-3">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">done_all</span>
              Mark All Present
            </Button>
            <Button variant="ghost" className="text-xs h-8 px-3">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">clear_all</span>
              Clear Selection
            </Button>
            <Button className="text-xs h-8 px-4" disabled>
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">save</span>
              Save Attendance
            </Button>
          </div>
        )}
      </div>

      {/* Table or empty state */}
      <div className="overflow-x-auto">
        {students.length === 0 ? (
          <AttendanceEmptyState />
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[var(--color-outline-variant)]">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className={`font-label-md text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wider px-5 py-3 ${col.width}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody />
          </table>
        )}
      </div>
    </div>
  );
}
