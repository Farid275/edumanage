import AppModal from "../../../components/overlay/AppModal";
import { LecturerForm } from "./LecturerForm";

export function LecturerFormModal({
  isOpen,
  mode = "create",
  lecturer,
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
      title={mode === "edit" ? "Edit Lecturer" : "Add Lecturer"}
      description={mode === "edit"
        ? "Update the lecturer academic record."
        : "Link a registered lecturer account and complete its academic record."}
      size="lg"
      isBusy={isSaving}
    >
      <LecturerForm
        mode={mode}
        lecturer={lecturer}
        availableProfiles={availableProfiles}
        isSaving={isSaving}
        error={error}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </AppModal>
  );
}
