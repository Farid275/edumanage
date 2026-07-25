import { useState } from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { LecturerSummary } from '../components/LecturerSummary';
import { LecturerToolbar } from '../components/LecturerToolbar';
import { LecturersTable } from '../components/LecturersTable';
import { LecturerFormModal } from '../components/LecturerFormModal';
import { DeleteLecturerDialog } from '../components/DeleteLecturerDialog';
import { useLecturers } from '../hooks/useLecturers';
import { useAuth } from '../../auth/context/AuthContext';
import { LoadingState } from '../../../components/feedback/LoadingState';
import { ErrorState } from '../../../components/feedback/ErrorState';

export function LecturersPage() {
  const { role } = useAuth();
  
  const {
    lecturers,
    allLecturersCount,
    availableProfiles,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleCheckAssignments
  } = useLecturers();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [lecturerToEdit, setLecturerToEdit] = useState(null);
  const [lecturerToDelete, setLecturerToDelete] = useState(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const isAdmin = role === 'admin';

  const openCreateForm = () => {
    setLecturerToEdit(null);
    setFormError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (lecturer) => {
    setLecturerToEdit(lecturer);
    setFormError(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setLecturerToEdit(null);
    setFormError(null);
  };

  const handleSave = async (payload) => {
    setIsSaving(true);
    setFormError(null);
    
    const { error: saveError } = lecturerToEdit 
      ? await handleUpdate(lecturerToEdit.id, payload)
      : await handleCreate(payload);
      
    if (saveError) {
      setFormError(saveError);
      setIsSaving(false);
    } else {
      setIsSaving(false);
      closeForm();
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto w-full pt-10">
        <LoadingState message="Loading lecturers..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto w-full pt-10">
        <ErrorState message={error} />
      </div>
    );
  }

  const activeCount = lecturers.filter(l => l.employment_status === 'active').length;
  const onLeaveCount = lecturers.filter(l => l.employment_status === 'on_leave').length;
  const totalAssignedCourses = lecturers.reduce((sum, l) => sum + (l.assigned_course_count || 0), 0);

  return (
    <div className="max-w-7xl mx-auto w-full relative overflow-x-hidden">
      <PageHeader
        title="Lecturers"
        description="Manage lecturer profiles and teaching assignments."
        action={
          isAdmin ? (
            <Button onClick={openCreateForm}>
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">person_add</span>
              Add Lecturer
            </Button>
          ) : null
        }
      />

      <LecturerSummary 
        total={allLecturersCount}
        active={activeCount}
        onLeave={onLeaveCount}
        totalCourses={totalAssignedCourses}
      />
      
      <LecturerToolbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      <LecturersTable 
        lecturers={lecturers} 
        onEdit={openEditForm}
        onDelete={(lecturer) => setLecturerToDelete(lecturer)}
      />

      <LecturerFormModal
        isOpen={isFormOpen}
        mode={lecturerToEdit ? "edit" : "create"}
        lecturer={lecturerToEdit}
        availableProfiles={availableProfiles}
        isSaving={isSaving}
        error={formError}
        onSubmit={handleSave}
        onClose={closeForm}
      />

      {lecturerToDelete && (
        <DeleteLecturerDialog
          lecturer={lecturerToDelete}
          onClose={() => setLecturerToDelete(null)}
          onConfirm={handleDelete}
          onCheckAssignments={handleCheckAssignments}
        />
      )}
    </div>
  );
}
