import { useState, useEffect } from 'react';
import AppModal from '../../../components/overlay/AppModal';
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

  const footer = (
    <>
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
    </>
  );

  return (
    <AppModal
      isOpen={true}
      onClose={onClose}
      title="Delete Lecturer Record"
      size="sm"
      isBusy={isDeleting}
      footer={footer}
    >
      <div className="flex flex-col gap-4 w-full min-w-0 box-border">
        <p className="text-sm text-[var(--color-on-surface-variant)]">
          Are you sure you want to delete the academic record for <strong>{lecturer.full_name}</strong>?
        </p>

        {isChecking ? (
          <div className="flex items-center gap-2 text-sm text-[var(--color-on-surface-variant)] box-border">
            <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
            Checking course assignments...
          </div>
        ) : hasAssignedCourses ? (
          <div className="p-4 rounded-lg bg-orange-50 border border-orange-200 text-orange-800 text-sm flex items-start gap-3 box-border">
            <span className="material-symbols-outlined text-[20px] shrink-0">assignment_late</span>
            <p>This lecturer is still assigned to one or more courses. Reassign or remove those course assignments before deleting the academic record.</p>
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] text-sm flex items-start gap-3 box-border">
            <span className="material-symbols-outlined text-[20px] shrink-0 text-blue-600">info</span>
            <p>Deleting this academic record does not delete the lecturer’s login account or profile.</p>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-100 box-border">
            {errorMsg}
          </div>
        )}
      </div>
    </AppModal>
  );
}
