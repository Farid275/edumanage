import { useState } from 'react';
import { AppConfirmDialog } from '../../../components/overlay/AppConfirmDialog';

export function DeleteStudentDialog({ student, onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!student) return null;

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    setErrorMsg('');
    
    const { error } = await onConfirm(student.id);
    
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
        Are you sure you want to delete the academic record for <span className="font-medium text-[var(--color-on-surface)]">{student.profiles?.full_name}</span>?
      </p>
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
        <p className="text-xs text-amber-800 leading-relaxed font-medium">
          Deleting this academic record will also remove its course enrollments. The student's login account and profile will remain available.
        </p>
      </div>
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
      title="Delete Academic Record"
      description={description}
      confirmLabel="Delete"
      variant="danger"
      isConfirming={isDeleting}
      onConfirm={handleDelete}
      onClose={onClose}
    />
  );
}
