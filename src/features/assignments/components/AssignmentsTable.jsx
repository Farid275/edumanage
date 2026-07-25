import { AssignmentsEmptyState } from './AssignmentsEmptyState';
import { useAuth } from '../../auth/context/AuthContext';
import { isDateInPast } from '../utils/dateUtils';

const columns = [
  { key: 'assignment', label: 'Assignment', width: 'min-w-[220px]' },
  { key: 'course', label: 'Course', width: 'min-w-[160px]' },
  { key: 'dueDate', label: 'Due Date', width: 'w-[150px]' },
  { key: 'totalPoints', label: 'Points', width: 'w-[90px] text-right' },
  { key: 'status', label: 'Status', width: 'w-[120px]' },
  { key: 'actions', label: '', width: 'w-[120px]' },
];

export function AssignmentsTable({ assignments = [], onEdit, onDelete, onViewDetails }) {
  const { role } = useAuth();
  const isLecturer = role === 'lecturer';

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
          <tbody className="divide-y divide-[var(--color-divider)]">
            {assignments.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <AssignmentsEmptyState />
                </td>
              </tr>
            ) : (
              assignments.map((assignment) => {
                const isOverdue = assignment.status === 'published' && isDateInPast(assignment.due_at);
                
                return (
                  <tr key={assignment.id} className="hover:bg-[var(--color-surface-container-lowest)] transition-colors">
                    <td className="px-5 py-4 align-middle">
                      <p className="font-medium text-sm text-[var(--color-on-surface)]">
                        {assignment.title}
                      </p>
                      <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5 capitalize">
                        {assignment.submission_type.replace(/_/g, ' ')}
                        {assignment.allow_late_submission && ' • Late allowed'}
                      </p>
                    </td>
                    <td className="px-5 py-4 align-middle">
                      <p className="font-medium text-sm text-[var(--color-on-surface)]">
                        {assignment.course_code}
                      </p>
                      <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5 truncate max-w-[200px]">
                        {assignment.course_name}
                      </p>
                    </td>
                    <td className="px-5 py-4 align-middle">
                      <div className="flex flex-col items-start">
                        <span className="text-sm text-[var(--color-on-surface)]">
                          {new Date(assignment.due_at).toLocaleDateString(undefined, { 
                            year: 'numeric', month: 'short', day: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </span>
                        {isOverdue && (
                          <span className="inline-flex mt-1 items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-800">
                            Overdue
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 align-middle text-right text-sm text-[var(--color-on-surface)] font-medium">
                      {assignment.max_score}
                    </td>
                    <td className="px-5 py-4 align-middle">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        assignment.status === 'published' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                        assignment.status === 'closed' ? 'bg-slate-100 text-slate-700 border-slate-200' :
                        'bg-orange-50 text-orange-700 border-orange-200'
                      }`}>
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onViewDetails(assignment)}
                          className="p-1.5 rounded-md text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] hover:text-[var(--color-primary)] transition-colors"
                          title="View Details"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        
                        {isLecturer && (
                          <>
                            <button
                              type="button"
                              onClick={() => onEdit(assignment)}
                              className="p-1.5 rounded-md text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] hover:text-[var(--color-primary)] transition-colors"
                              title="Edit Assignment"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => onDelete(assignment)}
                              className="p-1.5 rounded-md text-[var(--color-on-surface-variant)] hover:bg-red-50 hover:text-red-600 transition-colors"
                              title="Delete Assignment"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
