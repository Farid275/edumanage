import { useState } from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { StudentSummary } from '../components/StudentSummary';
import { StudentToolbar } from '../components/StudentToolbar';
import { StudentsTable } from '../components/StudentsTable';
import { StudentFormModal } from '../components/StudentFormModal';
import { DeleteStudentDialog } from '../components/DeleteStudentDialog';
import { StudentEnrollmentPanel } from '../components/StudentEnrollmentPanel';
import { useStudents } from '../hooks/useStudents';
import { useAuth } from '../../auth/context/AuthContext';
import { LoadingState } from '../../../components/feedback/LoadingState';
import { ErrorState } from '../../../components/feedback/ErrorState';

export function StudentsPage() {
  const { role } = useAuth();
  
  const {
    students,
    allStudentsCount,
    availableProfiles,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    programFilter,
    setProgramFilter,
    statusFilter,
    setStatusFilter,
    handleCreate,
    handleUpdate,
    handleDelete
  } = useStudents();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [studentToEnroll, setStudentToEnroll] = useState(null);
  
  const [isSavingStudent, setIsSavingStudent] = useState(false);
  const [studentFormError, setStudentFormError] = useState(null);

  const isAdmin = role === 'admin';

  const openCreateForm = () => {
    setStudentToEdit(null);
    setStudentFormError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (student) => {
    setStudentToEdit(student);
    setStudentFormError(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setStudentToEdit(null);
    setStudentFormError(null);
  };

  const handleSaveStudent = async (payload) => {
    setIsSavingStudent(true);
    setStudentFormError(null);
    
    const { error } = studentToEdit 
      ? await handleUpdate(studentToEdit.id, payload)
      : await handleCreate(payload);
      
    if (error) {
      setStudentFormError(error);
      setIsSavingStudent(false);
    } else {
      setIsSavingStudent(false);
      closeForm();
    }
  };

  const confirmDelete = async (id) => {
    return await handleDelete(id);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto w-full pt-10">
        <LoadingState message="Loading students..." />
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

  const activeCount = students.filter(s => s.status === 'active').length;
  const graduatedCount = students.filter(s => s.status === 'graduated').length;

  return (
    <div className="max-w-7xl mx-auto w-full relative overflow-x-hidden">
      <PageHeader 
        title="Students" 
        description="Manage student academic records and course enrollments."
        action={
          isAdmin ? (
            <Button onClick={openCreateForm}>
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">person_add</span>
              Add Student
            </Button>
          ) : null
        }
      />

      <StudentSummary 
        total={allStudentsCount}
        active={activeCount}
        graduated={graduatedCount}
      />
      
      <StudentToolbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        programFilter={programFilter}
        setProgramFilter={setProgramFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      <StudentsTable 
        students={students} 
        onEdit={openEditForm}
        onDelete={(student) => setStudentToDelete(student)}
        onManageEnrollments={(student) => setStudentToEnroll(student)}
      />

      {studentToDelete && (
        <DeleteStudentDialog
          student={studentToDelete}
          onClose={() => setStudentToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}

      {studentToEnroll && (
        <StudentEnrollmentPanel
          student={studentToEnroll}
          onClose={() => setStudentToEnroll(null)}
        />
      )}

      <StudentFormModal
        isOpen={isFormOpen}
        mode={studentToEdit ? "edit" : "create"}
        student={studentToEdit}
        availableProfiles={availableProfiles}
        isSaving={isSavingStudent}
        error={studentFormError}
        onSubmit={handleSaveStudent}
        onClose={closeForm}
      />
    </div>
  );
}
