import { LecturersEmptyState } from './LecturersEmptyState';
import { useAuth } from '../../auth/context/AuthContext';

const columns = [
  { key: 'lecturer', label: 'Lecturer', width: 'min-w-[200px]' },
  { key: 'lecturerNumber', label: 'Lecturer Number', width: 'w-[150px]' },
  { key: 'department', label: 'Department', width: 'min-w-[140px]' },
  { key: 'academicTitle', label: 'Title & Spec.', width: 'min-w-[200px]' },
  { key: 'assignedCourses', label: 'Courses', width: 'w-[100px] text-right' },
  { key: 'status', label: 'Status', width: 'w-[120px]' },
  { key: 'actions', label: '', width: 'w-[100px]' },
];

export function LecturersTable({ lecturers = [], onEdit, onDelete }) {
  const { role } = useAuth();
  const isAdmin = role === 'admin';

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
            {lecturers.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <LecturersEmptyState />
                </td>
              </tr>
            ) : (
              lecturers.map((lecturer) => (
                <tr key={lecturer.id} className="hover:bg-[var(--color-surface-container-lowest)] transition-colors">
                  <td className="px-5 py-4 align-middle">
                    <p className="font-medium text-sm text-[var(--color-on-surface)]">
                      {lecturer.full_name || 'Unknown'}
                    </p>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <span className="text-sm text-[var(--color-on-surface-variant)] font-mono">
                      {lecturer.lecturer_number}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <span className="text-sm text-[var(--color-on-surface-variant)] uppercase">
                      {lecturer.department}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <p className="text-sm text-[var(--color-on-surface)]">
                      {lecturer.academic_title}
                    </p>
                    {lecturer.specialization && (
                      <p className="text-xs text-[var(--color-on-surface-variant)] mt-0.5">
                        {lecturer.specialization}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4 align-middle text-right">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-surface-container)] text-sm font-medium text-[var(--color-on-surface)]">
                      {lecturer.assigned_course_count || 0}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      lecturer.employment_status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 
                      lecturer.employment_status === 'on_leave' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                      'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {lecturer.employment_status === 'active' ? 'Active' : 
                       lecturer.employment_status === 'on_leave' ? 'On Leave' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-4 align-middle text-right">
                    {isAdmin && (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(lecturer)}
                          className="p-1.5 rounded-md text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] hover:text-[var(--color-primary)] transition-colors"
                          title="Edit Lecturer"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(lecturer)}
                          className="p-1.5 rounded-md text-[var(--color-on-surface-variant)] hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete Lecturer"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
