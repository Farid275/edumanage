import { Button } from '../../../components/ui/Button';

export function GradesTable({ role, data, onGradeClick, onDownloadFile }) {
  const isLecturer = role === 'lecturer';

  if (!data || data.length === 0) {
    return null; // Handled by empty state in page
  }

  return (
    <div className="w-full min-w-0 overflow-x-auto rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] box-border">
      <table className="w-full min-w-[800px] text-left text-sm text-[var(--color-on-surface)]">
        <thead className="bg-[var(--color-surface-container-low)] text-xs font-semibold uppercase tracking-wider text-[var(--color-on-surface-variant)] border-b border-[var(--color-outline-variant)]">
          <tr>
            {isLecturer && <th className="px-6 py-4">Student</th>}
            <th className="px-6 py-4">Assignment & Course</th>
            <th className="px-6 py-4">Status & Attempt</th>
            {isLecturer && <th className="px-6 py-4">Submitted / File</th>}
            <th className="px-6 py-4 text-center">Score</th>
            {!isLecturer && <th className="px-6 py-4">Feedback</th>}
            {isLecturer && <th className="px-6 py-4 text-right">Action</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-outline-variant)]">
          {data.map((row) => (
            <tr key={row.submission.id} className="hover:bg-[var(--color-surface-container)] transition-colors">
              
              {/* STUDENT COLUMN (Lecturer only) */}
              {isLecturer && (
                <td className="px-6 py-4">
                  <p className="font-medium text-[var(--color-on-surface)]">
                    {row.student.full_name}
                  </p>
                  <p className="text-xs text-[var(--color-on-surface-variant)]">
                    {row.student.student_number}
                  </p>
                </td>
              )}

              {/* ASSIGNMENT COLUMN */}
              <td className="px-6 py-4 max-w-xs">
                <p className="font-medium text-[var(--color-on-surface)] truncate">
                  {row.assignment?.title}
                </p>
                <p className="text-xs text-[var(--color-on-surface-variant)] truncate">
                  {row.course?.course_code} - {row.course?.course_name}
                </p>
              </td>

              {/* STATUS COLUMN */}
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1 items-start">
                  {row.grade?.status === 'published' ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                      Graded
                    </span>
                  ) : row.grade?.status === 'draft' ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
                      Draft Grade
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      Needs Grading
                    </span>
                  )}
                  {isLecturer && (
                    <span className="text-xs text-[var(--color-on-surface-variant)]">
                      Attempt: {row.submission.attempt_count}
                    </span>
                  )}
                  {row.submission.is_late && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                      Late
                    </span>
                  )}
                </div>
              </td>

              {/* SUBMISSION / FILE (Lecturer only) */}
              {isLecturer && (
                <td className="px-6 py-4">
                  <div className="text-xs text-[var(--color-on-surface-variant)] mb-1">
                    {new Date(row.submission.submitted_at).toLocaleDateString()}
                  </div>
                  {row.submission.file_path ? (
                    <button 
                      onClick={() => onDownloadFile(row.submission.file_path)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-primary)] hover:underline truncate max-w-[150px]"
                      title={row.submission.file_name}
                    >
                      <span className="material-symbols-outlined text-[14px]">download</span>
                      File
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-[var(--color-on-surface-variant)]">
                      <span className="material-symbols-outlined text-[14px]">notes</span>
                      Text Only
                    </span>
                  )}
                </td>
              )}

              {/* SCORE */}
              <td className="px-6 py-4 text-center">
                {row.grade ? (
                  <span className="font-bold text-[var(--color-on-surface)]">
                    {row.grade.score} <span className="text-xs font-normal text-[var(--color-on-surface-variant)]">/ {row.assignment?.max_score}</span>
                  </span>
                ) : (
                  <span className="text-[var(--color-on-surface-variant)]">-</span>
                )}
              </td>

              {/* FEEDBACK (Student only) */}
              {!isLecturer && (
                <td className="px-6 py-4 max-w-sm">
                  <p className="text-sm text-[var(--color-on-surface-variant)] truncate" title={row.grade?.feedback}>
                    {row.grade?.feedback || '-'}
                  </p>
                </td>
              )}

              {/* ACTION (Lecturer only) */}
              {isLecturer && (
                <td className="px-6 py-4 text-right">
                  <Button 
                    variant={row.grade ? "outline" : "primary"}
                    size="sm"
                    onClick={() => onGradeClick(row)}
                  >
                    {row.grade ? "Edit Grade" : "Grade"}
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
