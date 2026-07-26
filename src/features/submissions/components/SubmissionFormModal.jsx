import AppModal from "../../../components/overlay/AppModal";
import { SubmissionForm } from "./SubmissionForm";

export function SubmissionFormModal({
  isOpen,
  assignment,
  existingSubmission,
  isSaving,
  error,
  onSubmit,
  onClose,
}) {
  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={existingSubmission ? "Update Submission" : "Submit Assignment"}
      description={assignment?.title}
      size="lg"
      isBusy={isSaving}
    >
      <div className="w-full min-w-0 box-border">
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 w-full min-w-0 box-border">
            <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
            <p>{error}</p>
          </div>
        )}

        <SubmissionForm
          assignment={assignment}
          existingSubmission={existingSubmission}
          isSaving={isSaving}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </AppModal>
  );
}
