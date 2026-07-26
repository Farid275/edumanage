import { useState } from 'react';
import { AppConfirmDialog } from '../../../components/overlay/AppConfirmDialog';

export function DeleteAssignmentDialog({ assignment, onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMsg('');
    
    const { error } = await onConfirm(assignment.id);
    
    if (error) {
      setErrorMsg(error);
      setIsDeleting(false);
    } else {
      setIsDeleting(false);
      onClose();
    }
  };

  if (!assignment) return null;

  const description = (
    <div className="flex flex-col gap-4 w-full min-w-0 box-border">
      <p className="text-sm text-[var(--color-on-surface-variant)]">
        Are you sure you want to delete <strong>{assignment.title}</strong>?
      </p>

      <div className="p-4 rounded-lg bg-orange-50 border border-orange-200 text-orange-800 text-sm flex items-start gap-3 w-full box-border">
        <span className="material-symbols-outlined text-[20px] shrink-0">delete_forever</span>
        <p>Deleting this assignment will permanently remove the assignment record. Student submissions will also be removed after submission support is added.</p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-100 w-full box-border">
          {errorMsg}
        </div>
      )}
    </div>
  );

  return (
    <AppConfirmDialog
      isOpen={true}
      onClose={onClose}
      onConfirm={handleDelete}
      title="Delete Assignment"
      description={description}
      confirmLabel="Delete Assignment"
      variant="danger"
      isConfirming={isDeleting}
    />
  );
}
