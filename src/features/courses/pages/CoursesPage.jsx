import { useState } from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { CourseSummary } from '../components/CourseSummary';
import { CourseToolbar } from '../components/CourseToolbar';
import { CoursesTable } from '../components/CoursesTable';
import { CourseFormModal } from '../components/CourseFormModal';
import { DeleteCourseDialog } from '../components/DeleteCourseDialog';
import { useCourses } from '../hooks/useCourses';
import { useAuth } from '../../auth/context/AuthContext';
import { LoadingState } from '../../../components/feedback/LoadingState';
import { ErrorState } from '../../../components/feedback/ErrorState';

export function CoursesPage() {
  const { role, user } = useAuth();
  
  const {
    courses,
    allCoursesCount,
    lecturers,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    semesterFilter,
    setSemesterFilter,
    statusFilter,
    setStatusFilter,
    handleCreate,
    handleUpdate,
    handleDelete
  } = useCourses();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const canCreate = role === 'admin' || role === 'lecturer';

  const openCreateForm = () => {
    setFormMode('create');
    setCourseToEdit(null);
    setFormError('');
    setIsFormOpen(true);
  };

  const openEditForm = (course) => {
    setFormMode('edit');
    setCourseToEdit(course);
    setFormError('');
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setCourseToEdit(null);
    setFormError('');
  };

  const onSaveForm = async (payload) => {
    setIsSaving(true);
    setFormError('');
    let res;

    if (formMode === 'edit' && courseToEdit) {
      res = await handleUpdate(courseToEdit.id, payload);
    } else {
      res = await handleCreate(payload);
    }

    setIsSaving(false);

    if (res?.error) {
      setFormError(res.error);
    } else {
      closeForm();
    }
  };

  const confirmDelete = async (id) => {
    return await handleDelete(id);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto w-full pt-10">
        <LoadingState message="Loading courses..." />
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

  const activeCount = courses.filter(c => c.status === 'active').length;
  const archivedCount = courses.filter(c => c.status === 'archived').length;

  return (
    <div className="max-w-7xl mx-auto w-full">
      <PageHeader 
        title="Courses" 
        description="Manage academic courses and teaching assignments."
        action={
          canCreate ? (
            <Button onClick={openCreateForm}>
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add Course
            </Button>
          ) : null
        }
      />

      <CourseSummary 
        total={allCoursesCount} 
        active={activeCount} 
        archived={archivedCount} 
      />
      
      <CourseToolbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        semesterFilter={semesterFilter}
        setSemesterFilter={setSemesterFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      <CoursesTable 
        courses={courses} 
        onEdit={openEditForm}
        onDelete={(course) => setCourseToDelete(course)}
      />

      <CourseFormModal 
        isOpen={isFormOpen}
        mode={formMode}
        course={courseToEdit}
        lecturers={lecturers}
        currentRole={role}
        currentUserId={user?.id}
        isSaving={isSaving}
        error={formError}
        onClose={closeForm}
        onSubmit={onSaveForm}
      />

      {courseToDelete && (
        <DeleteCourseDialog
          course={courseToDelete}
          onClose={() => setCourseToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
