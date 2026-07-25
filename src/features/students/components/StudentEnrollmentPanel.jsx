import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { EnrollmentForm } from './EnrollmentForm';
import { useStudentEnrollments } from '../hooks/useStudentEnrollments';
import { useAuth } from '../../auth/context/AuthContext';
import { LoadingState } from '../../../components/feedback/LoadingState';

export function StudentEnrollmentPanel({ student, onClose }) {
  const { role } = useAuth();
  const {
    enrollments,
    availableCourses,
    isLoading,
    fetchEnrollments,
    handleCreate,
    handleUpdate,
    handleDelete
  } = useStudentEnrollments();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    if (student) {
      fetchEnrollments(student.id);
    }
  }, [student, fetchEnrollments]);

  if (!student) return null;

  const isAdmin = role === 'admin';

  const onUpdateStatus = async (id, newStatus) => {
    if (updatingId) return;
    setUpdatingId(id);
    setActionError('');
    const { error } = await handleUpdate(id, student.id, newStatus);
    if (error) setActionError(error);
    setUpdatingId(null);
  };

  const onRemoveEnrollment = async (id) => {
    if (deletingId) return;
    setDeletingId(id);
    setActionError('');
    const { error } = await handleDelete(id, student.id);
    if (error) setActionError(error);
    setDeletingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/45 cursor-default"
        aria-label="Close modal"
        onClick={onClose}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="enrollment-panel-title"
        className="relative z-10 block w-[calc(100vw_-_2rem)] max-w-3xl min-w-0 max-h-[calc(100vh_-_2rem)] overflow-y-auto rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface)] shadow-xl animate-fade-in-up"
      >
        <div className="px-7 py-6 border-b border-[var(--color-outline-variant)] flex items-center justify-between w-full shrink-0">
          <div>
            <h2 id="enrollment-panel-title" className="font-title-lg text-[var(--color-on-surface)]">
              Course Enrollments
            </h2>
            <p className="text-sm text-[var(--color-on-surface-variant)] mt-1">
              {student.profiles?.full_name} ({student.student_number})
            </p>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] transition-colors p-2 -mr-2"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="px-7 py-6 w-full min-w-0">
          {actionError && (
            <div className="mb-6 p-4 rounded-md bg-red-50 text-red-700 text-sm border border-red-200 w-full">
              {actionError}
            </div>
          )}

          {isAdmin && !isFormOpen && (
            <div className="mb-6 w-full">
              <Button onClick={() => setIsFormOpen(true)} className="w-full">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add Enrollment
              </Button>
            </div>
          )}

          {isAdmin && isFormOpen && (
            <div className="mb-6 w-full">
              <EnrollmentForm 
                studentId={student.id}
                availableCourses={availableCourses}
                enrollments={enrollments}
                onSave={handleCreate}
                onCancel={() => setIsFormOpen(false)}
              />
            </div>
          )}

          <div className="space-y-4 w-full min-w-0">
            <h3 className="font-label-lg font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wider text-xs">
              Current Enrollments
            </h3>

            {isLoading ? (
              <LoadingState message="Loading enrollments..." />
            ) : enrollments.length === 0 ? (
              <div className="text-center py-10 bg-[var(--color-surface-container)] rounded-lg border border-dashed border-[var(--color-outline-variant)] w-full">
                <span className="material-symbols-outlined text-[24px] text-[var(--color-outline)] mb-2">menu_book</span>
                <p className="text-sm text-[var(--color-on-surface-variant)]">No courses enrolled.</p>
              </div>
            ) : (
              <div className="space-y-3 w-full min-w-0">
                {enrollments.map(enrollment => {
                  const isUpdating = updatingId === enrollment.id;
                  const isDeleting = deletingId === enrollment.id;
                  const isBusy = isUpdating || isDeleting;

                  const statusColors = {
                    active: 'bg-green-100 text-green-700',
                    completed: 'bg-blue-100 text-blue-700',
                    dropped: 'bg-gray-100 text-gray-700'
                  };

                  return (
                    <div key={enrollment.id} className="p-4 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] w-full min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2 w-full min-w-0">
                        <div className="min-w-0">
                          <div className="font-label-lg font-bold text-[var(--color-on-surface)] truncate">
                            {enrollment.courses?.course_code}
                          </div>
                          <div className="font-body-sm text-sm text-[var(--color-on-surface-variant)] truncate">
                            {enrollment.courses?.course_name}
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${statusColors[enrollment.status] || statusColors.dropped}`}>
                          {enrollment.status}
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-3 w-full min-w-0">
                        <div className="text-xs text-[var(--color-outline)] shrink-0">
                          Enrolled: {new Date(enrollment.enrolled_at).toLocaleDateString()}
                        </div>
                        
                        {isAdmin && (
                          <div className="flex items-center gap-2 shrink-0">
                            <select
                              value={enrollment.status}
                              onChange={(e) => onUpdateStatus(enrollment.id, e.target.value)}
                              disabled={isBusy}
                              className="text-xs py-1.5 pl-2 pr-7 border-[var(--color-outline-variant)] rounded-md bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)] focus:ring-1 focus:ring-[var(--color-primary)] disabled:opacity-50 min-h-[36px]"
                            >
                              <option value="active">Active</option>
                              <option value="completed">Completed</option>
                              <option value="dropped">Dropped</option>
                            </select>
                            
                            <button
                              onClick={() => onRemoveEnrollment(enrollment.id)}
                              disabled={isBusy}
                              className="p-1.5 text-[var(--color-outline)] hover:text-red-600 rounded-md disabled:opacity-50 transition-colors min-h-[36px] flex items-center justify-center bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)]"
                              title="Remove enrollment"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
