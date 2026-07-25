import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../../../components/ui/Button';

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

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" aria-hidden="false">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/50 cursor-default"
        aria-label="Close dialog"
        onClick={() => { if (!isDeleting) onClose(); }}
      />
      
      <section 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="delete-assignment-title"
        className="relative z-10 w-full max-w-md overflow-hidden rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface)] shadow-2xl animate-fade-in-up flex flex-col"
      >
        <div className="flex w-full items-start gap-4 p-6 border-b border-[var(--color-divider)]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <span className="material-symbols-outlined">warning</span>
          </div>
          <div className="pt-1">
            <h2 id="delete-assignment-title" className="text-lg font-semibold text-[var(--color-on-surface)]">
              Delete Assignment
            </h2>
            <p className="mt-1 text-sm text-[var(--color-on-surface-variant)]">
              Are you sure you want to delete <strong>{assignment.title}</strong>?
            </p>
          </div>
        </div>
        
        <div className="p-6 pb-0 flex-1">
          <div className="p-4 rounded-lg bg-orange-50 border border-orange-200 text-orange-800 text-sm flex items-start gap-3">
            <span className="material-symbols-outlined text-[20px] shrink-0">delete_forever</span>
            <p>Deleting this assignment will permanently remove the assignment record. Student submissions will also be removed after submission support is added.</p>
          </div>

          {errorMsg && (
            <div className="mt-4 p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-100">
              {errorMsg}
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-end gap-3 p-6 pt-4 border-t border-[var(--color-divider)] bg-[var(--color-surface-container-lowest)]">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="danger" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Assignment'}
          </Button>
        </div>
      </section>
    </div>,
    document.body
  );
}
