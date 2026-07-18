import { AttendanceEmptyState } from './AttendanceEmptyState';

const columns = [
  { key: 'date', label: 'Date', width: 'w-[120px]' },
  { key: 'course', label: 'Course', width: 'min-w-[180px]' },
  { key: 'studentsRecorded', label: 'Students Recorded', width: 'w-[150px] text-right' },
  { key: 'attendanceRate', label: 'Attendance Rate', width: 'w-[140px] text-right' },
  { key: 'status', label: 'Status', width: 'w-[100px]' },
  { key: 'actions', label: '', width: 'w-[60px]' },
];

export function AttendanceHistory({ sessions = [] }) {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow overflow-hidden">
      <div className="px-5 py-4 border-b border-[var(--color-outline-variant)]">
        <h3 className="font-headline-sm text-base font-semibold text-[var(--color-on-surface)]">Attendance History</h3>
        <p className="font-body-sm text-xs text-[var(--color-on-surface-variant)] mt-0.5">Review past attendance sessions and completion rates.</p>
      </div>
      <div className="overflow-x-auto">
        {sessions.length === 0 ? (
          <AttendanceEmptyState
            message="No attendance sessions are available yet."
            detail="Completed attendance sessions will be recorded here."
          />
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
