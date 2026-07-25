import { useState } from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { CourseSummary } from '../components/CourseSummary';
import { CourseToolbar } from '../components/CourseToolbar';
import { CoursesTable } from '../components/CoursesTable';
import { CourseForm } from '../components/CourseForm';
import { DeleteCourseDialog } from '../components/DeleteCourseDialog';
import { useCourses } from '../hooks/useCourses';
import { useAuth } from '../../auth/context/AuthContext';
import { LoadingState } from '../../../components/feedback/LoadingState';
import { ErrorState } from '../../../components/feedback/ErrorState';

export function CoursesPage() {
  const { role } = useAuth();
  
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
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const canCreate = role === 'admin' || role === 'lecturer';

  const openCreateForm = () => {
    setCourseToEdit(null);
    setIsFormOpen(true);
  };

  const openEditForm = (course) => {
    setCourseToEdit(course);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setCourseToEdit(null);
  };

  const onSaveForm = async (payload) => {
    if (courseToEdit) {
      return await handleUpdate(courseToEdit.id, payload);
    } else {
      return await handleCreate(payload);
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

      {isFormOpen && (
        <CourseForm 
          course={courseToEdit}
          lecturers={lecturers}
          onClose={closeForm}
          onSave={onSaveForm}
        />
      )}

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
