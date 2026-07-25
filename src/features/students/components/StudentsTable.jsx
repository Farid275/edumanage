import { StudentsEmptyState } from './StudentsEmptyState';
import { useAuth } from '../../auth/context/AuthContext';

const columns = [
  { key: 'student', label: 'Student', width: 'min-w-[200px]' },
  { key: 'studentNumber', label: 'Student Number', width: 'w-[140px]' },
  { key: 'program', label: 'Program', width: 'min-w-[160px]' },
  { key: 'enrollmentYear', label: 'Year', width: 'w-[100px]' },
  { key: 'enrolledCourses', label: 'Courses', width: 'w-[90px] text-center' },
  { key: 'status', label: 'Status', width: 'w-[100px]' },
  { key: 'actions', label: '', width: 'w-[120px] text-right' },
];

const statusStyles = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-700',
  graduated: 'bg-blue-100 text-blue-700',
  suspended: 'bg-red-100 text-red-700'
};

const programLabels = {
  'cs': 'Computer Science',
  'ee': 'Electrical Engineering',
  'ba': 'Business Administration'
};

export function StudentsTable({ students = [], onEdit, onDelete, onManageEnrollments }) {
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
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <StudentsEmptyState />
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="border-b border-[var(--color-outline-variant)] last:border-b-0 hover:bg-[var(--color-surface-container)]/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-primary-container)] text-[var(--color-primary)] flex items-center justify-center text-sm font-bold uppercase">
                        {student.profiles?.full_name?.charAt(0) || '?'}
                      </div>
                      <span className="font-title-sm font-medium text-[var(--color-on-surface)]">
                        {student.profiles?.full_name || 'Unknown Student'}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-label-lg font-bold text-[var(--color-on-surface-variant)]">
                      {student.student_number}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-body-sm text-sm text-[var(--color-on-surface-variant)]">
                      {programLabels[student.program] || student.program}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-body-sm text-sm text-[var(--color-on-surface-variant)]">
                      {student.enrollment_year}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-surface-container-high)] text-[var(--color-on-surface-variant)] text-xs font-medium">
                      {student.course_enrollments?.[0]?.count || 0}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${statusStyles[student.status] || statusStyles.inactive}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onManageEnrollments(student)}
                        className="p-1.5 text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] rounded-md hover:bg-[var(--color-surface-container-high)] transition-colors"
                        title={isAdmin ? "Manage enrollments" : "View enrollments"}
                      >
                        <span className="material-symbols-outlined text-[18px]">library_books</span>
                      </button>
                      
                      {isAdmin && (
                        <>
                          <button
                            onClick={() => onEdit(student)}
                            className="p-1.5 text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] rounded-md hover:bg-[var(--color-surface-container-high)] transition-colors"
                            title="Edit student"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button
                            onClick={() => onDelete(student)}
                            className="p-1.5 text-[var(--color-on-surface-variant)] hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                            title="Delete student"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </>
                      )}
                    </div>
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
