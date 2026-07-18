import { LecturersEmptyState } from './LecturersEmptyState';

const columns = [
  { key: 'lecturer', label: 'Lecturer', width: 'min-w-[200px]' },
  { key: 'lecturerNumber', label: 'Lecturer Number', width: 'w-[150px]' },
  { key: 'email', label: 'Email', width: 'min-w-[200px]' },
  { key: 'department', label: 'Department', width: 'min-w-[160px]' },
  { key: 'assignedCourses', label: 'Assigned Courses', width: 'w-[140px] text-right' },
  { key: 'status', label: 'Status', width: 'w-[100px]' },
  { key: 'actions', label: '', width: 'w-[60px]' },
];

export function LecturersTable({ lecturers = [] }) {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow overflow-hidden">
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
            {lecturers.length === 0 && (
              <tr>
                <td colSpan={columns.length}>
                  <LecturersEmptyState />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
