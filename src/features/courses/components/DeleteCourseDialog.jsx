import { useState } from 'react';
import { AppConfirmDialog } from '../../../components/overlay/AppConfirmDialog';

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

  const description = (
    <div className="flex flex-col gap-4 w-full min-w-0 box-border">
      <p className="text-[var(--color-on-surface-variant)]">
        Are you sure you want to delete <span className="font-medium text-[var(--color-on-surface)]">{course.course_code} - {course.course_name}</span>? This action cannot be undone.
      </p>
      {errorMsg && (
        <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-200">
          {errorMsg}
        </div>
      )}
    </div>
  );

  return (
    <AppConfirmDialog
      isOpen={true}
      title="Delete Course"
      description={description}
      confirmLabel="Delete"
      variant="danger"
      isConfirming={isDeleting}
      onConfirm={handleDelete}
      onClose={onClose}
    />
  );
}
