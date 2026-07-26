import AppModal from "../../../components/overlay/AppModal";
import { GradeForm } from "./GradeForm";

export function GradeFormModal({
  isOpen,
  submissionData,
  isSaving,
  error,
  onSubmit,
  onClose,
}) {
  if (!submissionData) return null;

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title="Grade Submission"
      description={`${submissionData.student.full_name} • ${submissionData.assignment.title}`}
      size="lg"
      isBusy={isSaving}
    >
      <div className="w-full min-w-0 box-border">
        <div className="mb-6 p-4 bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-lg w-full min-w-0 box-border">
          <h4 className="text-xs font-bold text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-2">Submission Details</h4>
          
          {submissionData.submission.text_content && (
            <div className="mb-4 w-full min-w-0 box-border">
              <p className="text-sm font-medium text-[var(--color-on-surface)] mb-1">Text Response:</p>
              <div className="text-sm text-[var(--color-on-surface-variant)] bg-[var(--color-surface)] p-3 rounded border border-[var(--color-outline-variant)] whitespace-pre-wrap max-h-40 overflow-y-auto">
                {submissionData.submission.text_content}
              </div>
            </div>
          )}
          
          {submissionData.submission.file_path && (
            <div className="w-full min-w-0 box-border">
              <p className="text-sm font-medium text-[var(--color-on-surface)] mb-1">Attached File:</p>
              <div className="flex items-center gap-2 text-sm text-[var(--color-on-surface-variant)]">
                <span className="material-symbols-outlined text-[18px]">attachment</span>
                {submissionData.submission.file_name}
              </div>
              <p className="text-xs text-[var(--color-on-surface-variant)] mt-1 ml-6">
                Download the file from the table to review it completely.
              </p>
            </div>
          )}
        </div>

        <GradeForm
          submissionData={submissionData}
          isSaving={isSaving}
          error={error}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </AppModal>
  );
}
