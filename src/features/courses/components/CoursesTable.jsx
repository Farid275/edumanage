import { CoursesEmptyState } from './CoursesEmptyState';
import { Badge } from '../../../components/ui/Badge';
import { useAuth } from '../../auth/context/AuthContext';

const columns = [
  { key: 'code', label: 'Course Code', width: 'w-[120px]' },
  { key: 'name', label: 'Course Name', width: 'min-w-[200px]' },
  { key: 'lecturer', label: 'Lecturer', width: 'min-w-[160px]' },
  { key: 'semester', label: 'Semester', width: 'w-[120px]' },
  { key: 'credits', label: 'Credits', width: 'w-[90px] text-right' },
  { key: 'status', label: 'Status', width: 'w-[100px]' },
  { key: 'actions', label: '', width: 'w-[80px] text-right' },
];

const statusStyles = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-700',
  archived: 'bg-amber-100 text-amber-700'
};

export function CoursesTable({ courses = [], onEdit, onDelete }) {
  const { role, user } = useAuth();

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
            {courses.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <CoursesEmptyState />
                </td>
              </tr>
            ) : (
              courses.map((course) => {
                const isAssignedLecturer = role === 'lecturer' && course.lecturer_id === user?.id;
                const canEdit = role === 'admin' || isAssignedLecturer;
                const canDelete = role === 'admin';

                return (
                  <tr key={course.id} className="border-b border-[var(--color-outline-variant)] last:border-b-0 hover:bg-[var(--color-surface-container)]/30 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-label-lg font-bold text-[var(--color-on-surface)]">
                        {course.course_code}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-title-sm font-medium text-[var(--color-on-surface)]">
                        {course.course_name}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {course.profiles ? (
                          <>
                            <div className="w-6 h-6 rounded-full bg-[var(--color-primary-container)] text-[var(--color-primary)] flex items-center justify-center text-xs font-bold uppercase">
                              {course.profiles.full_name.charAt(0)}
                            </div>
                            <span className="font-body-sm text-sm text-[var(--color-on-surface-variant)]">
                              {course.profiles.full_name}
                            </span>
                          </>
                        ) : (
                          <span className="font-body-sm text-sm italic text-[var(--color-outline)]">
                            Unassigned
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-body-sm text-sm text-[var(--color-on-surface-variant)] capitalize">
                        {course.semester.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="font-body-sm text-sm text-[var(--color-on-surface-variant)]">
                        {course.credits}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${statusStyles[course.status] || statusStyles.inactive}`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {canEdit && (
                          <button
                            onClick={() => onEdit(course)}
                            className="p-1.5 text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] rounded-md hover:bg-[var(--color-surface-container-high)] transition-colors"
                            title="Edit course"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                        )}
                        {canDelete && (
                          <button
                            onClick={() => onDelete(course)}
                            className="p-1.5 text-[var(--color-on-surface-variant)] hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                            title="Delete course"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
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
