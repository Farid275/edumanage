import AppModal from "../../../components/overlay/AppModal";
import { CourseForm } from "./CourseForm";

export function CourseFormModal({
  isOpen,
  mode = "create",
  course,
  lecturers,
  currentRole,
  currentUserId,
  isSaving,
  error,
  onSubmit,
  onClose,
}) {
  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "edit" ? "Edit Course" : "Add Course"}
      description={mode === "edit"
        ? "Update the course information and lecturer assignment."
        : "Create a course and optionally assign a lecturer."}
      size="lg"
      isBusy={isSaving}
    >
      <CourseForm
        mode={mode}
        course={course}
        lecturers={lecturers}
        currentRole={currentRole}
        currentUserId={currentUserId}
        isSaving={isSaving}
        error={error}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </AppModal>
  );
}
