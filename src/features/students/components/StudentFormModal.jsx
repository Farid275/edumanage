import AppModal from "../../../components/overlay/AppModal";
import { StudentForm } from "./StudentForm";

export function StudentFormModal({
  isOpen,
  mode = "create",
  student,
  availableProfiles,
  isSaving,
  error,
  onSubmit,
  onClose,
}) {
  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "edit" ? "Edit Student" : "Add Student"}
      description={mode === "edit" 
        ? "Update the student academic record." 
        : "Link a registered student account and complete its academic record."}
      size="lg"
      isBusy={isSaving}
    >
      <StudentForm
        mode={mode}
        student={student}
        availableProfiles={availableProfiles}
        isSaving={isSaving}
        error={error}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </AppModal>
  );
}
