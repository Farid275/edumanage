import { useState } from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { AssignmentSummary } from '../components/AssignmentSummary';
import { AssignmentToolbar } from '../components/AssignmentToolbar';
import { AssignmentsTable } from '../components/AssignmentsTable';
import { AssignmentFormModal } from '../components/AssignmentFormModal';
import { AssignmentDetailsModal } from '../components/AssignmentDetailsModal';
import { DeleteAssignmentDialog } from '../components/DeleteAssignmentDialog';
import { SubmissionFormModal } from '../../submissions/components/SubmissionFormModal';
import { useAssignments } from '../hooks/useAssignments';
import { useSubmission } from '../../submissions/hooks/useSubmission';
import { useAuth } from '../../auth/context/AuthContext';

export function AssignmentsPage() {
  const { role, user } = useAuth();
  const isLecturer = role === 'lecturer';

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmissionFormOpen, setIsSubmissionFormOpen] = useState(false);
  
  const [formMode, setFormMode] = useState('create');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const {
    assignments,
    assignableCourses,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    courseFilter,
    setCourseFilter,
    statusFilter,
    setStatusFilter,
    handleCreate,
    handleUpdate,
    handleDelete,
    refreshData
  } = useAssignments();

  const { submitWork } = useSubmission(
    isSubmissionFormOpen || isDetailsOpen ? selectedAssignment?.id : null,
    user?.id
  );

  // Derived state for Toolbar
  const uniqueCoursesMap = new Map();
  assignments.forEach(a => {
    if (a.course_id) {
      uniqueCoursesMap.set(a.course_id, { id: a.course_id, code: a.course_code, name: a.course_name });
    }
  });
  const uniqueCourses = Array.from(uniqueCoursesMap.values());

  // Derived state for Summary
  const total = assignments.length;
  const published = assignments.filter(a => a.status === 'published').length;
  const draft = assignments.filter(a => a.status === 'draft').length;
  const closed = assignments.filter(a => a.status === 'closed').length;

  const openCreateModal = () => {
    setFormMode('create');
    setSelectedAssignment(null);
    setFormError(null);
    setIsFormOpen(true);
  };

  const openEditModal = (assignment) => {
    setFormMode('edit');
    setSelectedAssignment(assignment);
    setFormError(null);
    setIsFormOpen(true);
  };

  const openDetailsModal = (assignment) => {
    setSelectedAssignment(assignment);
    setIsDetailsOpen(true);
  };

  const openDeleteModal = (assignment) => {
    setSelectedAssignment(assignment);
    setIsDeleteDialogOpen(true);
  };

  const openSubmitModal = (assignment) => {
    setSelectedAssignment(assignment);
    setSelectedSubmission(null);
    setFormError(null);
    setIsSubmissionFormOpen(true);
  };

  const openUpdateSubmissionModal = (assignment) => {
    setSelectedAssignment(assignment);
    setSelectedSubmission(assignment.submission);
    setFormError(null);
    setIsSubmissionFormOpen(true);
  };

  const onFormSubmit = async (payload) => {
    setIsSaving(true);
    setFormError(null);

    let res;
    if (formMode === 'create') {
      res = await handleCreate(payload);
    } else {
      res = await handleUpdate(selectedAssignment.id, payload);
    }

    setIsSaving(false);

    if (res.error) {
      setFormError(res.error);
    } else {
      setIsFormOpen(false);
    }
  };

  const handleSaveSubmission = async (textContent, selectedFile) => {
    setIsSaving(true);
    setFormError(null);

    const { error: submitError } = await submitWork({
      assignmentId: selectedAssignment.id,
      studentId: user?.id,
      textContent,
      selectedFile,
      existingSubmission: selectedSubmission
    });
    
    setIsSaving(false);
    
    if (submitError) {
      setFormError(submitError);
    } else {
      setIsSubmissionFormOpen(false);
      // Refresh assignments to get the latest submission
      await refreshData();
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      <PageHeader
        title="Assignments"
        description={isLecturer ? "Create and manage academic assignments across your courses." : "View your assignments across enrolled courses."}
        action={
          isLecturer && (
            <Button onClick={openCreateModal}>
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">note_add</span>
              Create Assignment
            </Button>
          )
        }
      />

      {error ? (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
          <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <AssignmentSummary 
            total={total} 
            published={published} 
            draft={draft} 
            closed={closed} 
            showDrafts={isLecturer} 
          />
          
          <AssignmentToolbar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            courseFilter={courseFilter}
            setCourseFilter={setCourseFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            uniqueCourses={uniqueCourses}
            showDrafts={isLecturer}
          />
          
          {isLoading ? (
            <div className="flex items-center justify-center p-12 bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-primary)] border-t-transparent"></div>
                <p className="text-sm font-medium text-[var(--color-on-surface-variant)]">Loading assignments...</p>
              </div>
            </div>
          ) : (
            <AssignmentsTable 
              assignments={assignments} 
              onEdit={openEditModal}
              onDelete={openDeleteModal}
              onViewDetails={openDetailsModal}
              onSubmitAssignment={openSubmitModal}
              onUpdateSubmission={openUpdateSubmissionModal}
            />
          )}
        </>
      )}

      {/* Modals */}
      <AssignmentFormModal 
        isOpen={isFormOpen}
        mode={formMode}
        assignment={selectedAssignment}
        assignableCourses={assignableCourses}
        isSaving={isSaving}
        error={formError}
        onSubmit={onFormSubmit}
        onClose={() => setIsFormOpen(false)}
      />

      <AssignmentDetailsModal 
        isOpen={isDetailsOpen}
        assignment={selectedAssignment}
        onClose={() => setIsDetailsOpen(false)}
        onSubmitAssignment={openSubmitModal}
        onUpdateSubmission={openUpdateSubmissionModal}
      />

      <DeleteAssignmentDialog 
        assignment={selectedAssignment}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
      
      {!isLecturer && (
        <SubmissionFormModal
          isOpen={isSubmissionFormOpen}
          assignment={selectedAssignment}
          existingSubmission={selectedSubmission}
          isSaving={isSaving}
          error={formError}
          onSubmit={handleSaveSubmission}
          onClose={() => setIsSubmissionFormOpen(false)}
        />
      )}
    </div>
  );
}
