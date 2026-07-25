import { useState } from 'react';
import { Button } from '../../../components/ui/Button';

export function DeleteCourseDialog({ course, onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!course) return null;

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    setErrorMsg('');
    
    const { error } = await onConfirm(course.id);
    
    if (error) {
      setErrorMsg(error);
      setIsDeleting(false);
    } else {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-[var(--color-surface-container-lowest)] rounded-xl ambient-shadow w-full max-w-sm animate-fade-in-up overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <span className="material-symbols-outlined text-[24px]">warning</span>
            </div>
            <div>
              <h3 className="font-title-md text-lg text-[var(--color-on-surface)] mb-2">
                Delete Course
              </h3>
              <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
                Are you sure you want to delete <span className="font-medium text-[var(--color-on-surface)]">{course.course_code} - {course.course_name}</span>? This action cannot be undone.
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="mt-5 p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-200">
              {errorMsg}
            </div>
          )}
        </div>

        <div className="bg-[var(--color-surface-container)] px-6 py-4 border-t border-[var(--color-outline-variant)] flex items-center justify-end gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <button
            type="button"
            className="h-10 px-4 rounded-lg font-label-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
