import { ReportEmptyState } from './ReportEmptyState';

const columns = [
  { key: 'course', label: 'Course', width: 'min-w-[200px]' },
  { key: 'lecturer', label: 'Lecturer', width: 'min-w-[160px]' },
  { key: 'students', label: 'Students', width: 'w-[100px] text-right' },
  { key: 'assignments', label: 'Assignments', width: 'w-[110px] text-right' },
  { key: 'attendanceRate', label: 'Attendance Rate', width: 'w-[140px] text-right' },
  { key: 'averageGrade', label: 'Average Grade', width: 'w-[130px] text-right' },
  { key: 'activityStatus', label: 'Activity Status', width: 'w-[140px]' },
];

export function CourseActivityTable({ data = [] }) {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--color-outline-variant)]">
            <h3 className="font-headline-sm text-base font-semibold text-[var(--color-on-surface)]">Course Activity</h3>
            <p className="font-body-sm text-xs text-[var(--color-on-surface-variant)] mt-0.5">Overview of engagement across all courses.</p>
        </div>
      <div className="overflow-x-auto">
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
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="p-0">
                  <div className="w-full min-h-[160px] md:min-h-[190px] flex flex-col items-center justify-center gap-2 py-7 px-6 text-center box-border">
                    <span className="material-symbols-outlined text-[22px] text-[var(--color-outline)] opacity-50 flex-none" aria-hidden="true">
                      table_chart
                    </span>
                    <p className="m-0 text-sm font-medium text-[var(--color-on-surface)]">
                      No course activity report is available yet.
                    </p>
                    <span className="max-w-[520px] text-xs text-[var(--color-outline)] leading-relaxed">
                      Course activity will appear after academic data is recorded.
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
