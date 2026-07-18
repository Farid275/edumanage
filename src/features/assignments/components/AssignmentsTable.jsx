import { AssignmentsEmptyState } from './AssignmentsEmptyState';

const columns = [
  { key: 'assignment', label: 'Assignment', width: 'min-w-[220px]' },
  { key: 'course', label: 'Course', width: 'min-w-[160px]' },
  { key: 'dueDate', label: 'Due Date', width: 'w-[130px]' },
  { key: 'totalPoints', label: 'Total Points', width: 'w-[110px] text-right' },
  { key: 'status', label: 'Status', width: 'w-[100px]' },
  { key: 'createdBy', label: 'Created By', width: 'min-w-[140px]' },
  { key: 'actions', label: '', width: 'w-[60px]' },
];

export function AssignmentsTable({ assignments = [] }) {
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
            {assignments.length === 0 && (
              <tr>
                <td colSpan={columns.length}>
                  <AssignmentsEmptyState />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
