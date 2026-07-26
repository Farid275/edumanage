import AppModal from "../../../components/overlay/AppModal";
import { AssignmentForm } from "./AssignmentForm";

export function AssignmentFormModal({
  isOpen,
  mode = "create",
  assignment,
  assignableCourses,
  isSaving,
  error,
  onSubmit,
  onClose,
}) {
  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "edit" ? "Edit Assignment" : "Create Assignment"}
      description={mode === "edit"
        ? "Update assignment details for your course."
        : "Add a new assignment for an assigned course."}
      size="lg"
      isBusy={isSaving}
    >
      <AssignmentForm
        mode={mode}
        assignment={assignment}
        assignableCourses={assignableCourses}
        isSaving={isSaving}
        error={error}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </AppModal>
  );
}
