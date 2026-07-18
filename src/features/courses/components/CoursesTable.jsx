import { CoursesEmptyState } from './CoursesEmptyState';

const columns = [
  { key: 'code', label: 'Course Code', width: 'w-[120px]' },
  { key: 'name', label: 'Course Name', width: 'min-w-[200px]' },
  { key: 'lecturer', label: 'Lecturer', width: 'min-w-[160px]' },
  { key: 'semester', label: 'Semester', width: 'w-[120px]' },
  { key: 'students', label: 'Students', width: 'w-[90px] text-right' },
  { key: 'status', label: 'Status', width: 'w-[100px]' },
  { key: 'actions', label: '', width: 'w-[60px]' },
];

export function CoursesTable({ courses = [] }) {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[var(--color-outline-variant)]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`font-label-md text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wider px-5 py-3 ${col.width}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 && (
              <tr>
                <td colSpan={columns.length}>
                  <CoursesEmptyState />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
