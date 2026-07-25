import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../../../components/ui/Button';

export function DeleteLecturerDialog({ lecturer, onClose, onConfirm, onCheckAssignments }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isChecking, setIsChecking] = useState(true);
  const [hasAssignedCourses, setHasAssignedCourses] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const checkAssignments = async () => {
      setIsChecking(true);
      setErrorMsg('');
      
      const { data, error } = await onCheckAssignments(lecturer.id);
      
      if (!isMounted) return;
      
      if (error) {
        setErrorMsg('Failed to verify course assignments.');
        setHasAssignedCourses(true); // Fail safe
      } else if (data && data.length > 0) {
        setHasAssignedCourses(true);
      } else {
        setHasAssignedCourses(false);
      }
      setIsChecking(false);
    };
    
    if (lecturer) {
      checkAssignments();
    }
    
    return () => {
      isMounted = false;
    };
  }, [lecturer, onCheckAssignments]);

  const handleDelete = async () => {
    if (hasAssignedCourses) return;
    
    setIsDeleting(true);
    setErrorMsg('');
    
    const { error } = await onConfirm(lecturer.id);
    
    if (error) {
      setErrorMsg(error);
      setIsDeleting(false);
    } else {
      setIsDeleting(false);
      onClose();
    }
  };

  if (!lecturer) return null;

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
        aria-labelledby="delete-lecturer-title"
        className="relative z-10 w-full max-w-md overflow-hidden rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface)] shadow-2xl animate-fade-in-up flex flex-col"
      >
        <div className="flex w-full items-start gap-4 p-6 border-b border-[var(--color-divider)]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <span className="material-symbols-outlined">warning</span>
          </div>
          <div className="pt-1">
            <h2 id="delete-lecturer-title" className="text-lg font-semibold text-[var(--color-on-surface)]">
              Delete Lecturer Record
            </h2>
            <p className="mt-1 text-sm text-[var(--color-on-surface-variant)]">
              Are you sure you want to delete the academic record for <strong>{lecturer.full_name}</strong>?
            </p>
          </div>
        </div>
        
        <div className="p-6 pb-0 flex-1">
          {isChecking ? (
            <div className="flex items-center gap-2 text-sm text-[var(--color-on-surface-variant)]">
              <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
              Checking course assignments...
            </div>
          ) : hasAssignedCourses ? (
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200 text-orange-800 text-sm flex items-start gap-3">
              <span className="material-symbols-outlined text-[20px] shrink-0">assignment_late</span>
              <p>This lecturer is still assigned to one or more courses. Reassign or remove those course assignments before deleting the academic record.</p>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] text-sm flex items-start gap-3">
              <span className="material-symbols-outlined text-[20px] shrink-0 text-blue-600">info</span>
              <p>Deleting this academic record does not delete the lecturer’s login account or profile.</p>
            </div>
          )}

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
            disabled={isDeleting || isChecking || hasAssignedCourses}
          >
            {isDeleting ? 'Deleting...' : 'Delete Record'}
          </Button>
        </div>
      </section>
    </div>,
    document.body
  );
}
