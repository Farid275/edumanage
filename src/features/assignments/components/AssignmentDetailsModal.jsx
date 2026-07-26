import { useEffect } from "react";
import AppModal from "../../../components/overlay/AppModal";
import { Button } from "../../../components/ui/Button";
import { useAuth } from "../../auth/context/AuthContext";
import { useSubmission } from "../../submissions/hooks/useSubmission";
import { SubmissionDetails } from "../../submissions/components/SubmissionDetails";
import { getSubmissionAvailability } from "../../submissions/utils/submissionAvailability";

export function AssignmentDetailsModal({
  isOpen,
  assignment,
  onClose,
  onSubmitAssignment,
  onUpdateSubmission
}) {
  const { role, user } = useAuth();
  const isStudent = role === 'student';

  const {
    submission,
    isLoading,
    error,
    downloadError,
    fetchSubmission,
    handleDownload
  } = useSubmission(isOpen && isStudent ? assignment?.id : null, user?.id);

  useEffect(() => {
    if (isOpen && isStudent && assignment?.id) {
      fetchSubmission();
    }
  }, [isOpen, isStudent, assignment?.id, fetchSubmission]);

  if (!isOpen || !assignment) return null;

  const availability = isStudent 
    ? getSubmissionAvailability(assignment, submission)
    : null;

  const footer = (
    <>
      <Button variant="outline" onClick={onClose}>Close</Button>
      {isStudent && availability && (
        <>
          {availability.canSubmit && (
            <Button onClick={() => {
              onClose();
              onSubmitAssignment(assignment);
            }}>
              <span className="material-symbols-outlined text-[18px]">publish</span>
              Submit Assignment
            </Button>
          )}
          {availability.canResubmit && (
            <Button onClick={() => {
              onClose();
              onUpdateSubmission({ ...assignment, submission });
            }}>
              <span className="material-symbols-outlined text-[18px]">publish</span>
              Update Submission
            </Button>
          )}
        </>
      )}
    </>
  );

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title="Assignment Details"
      description={`${assignment.course_code} - ${assignment.course_name}`}
      size="lg"
      footer={footer}
    >
      <div className="space-y-6 w-full min-w-0 box-border">
        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 w-full box-border">
            <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
            <p>{error}</p>
          </div>
        )}

        <div className="w-full min-w-0 box-border">
          <h3 className="text-2xl font-bold text-[var(--color-on-surface)] mb-2">{assignment.title}</h3>
          {assignment.description && (
            <p className="text-sm text-[var(--color-on-surface-variant)]">{assignment.description}</p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] w-full min-w-0 box-border">
          <div className="min-w-0 box-border">
            <div className="text-xs text-[var(--color-on-surface-variant)] font-medium mb-1 uppercase tracking-wider">Due Date</div>
            <div className="text-sm font-medium text-[var(--color-on-surface)]">
              {new Date(assignment.due_at).toLocaleDateString(undefined, { 
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
              })}
            </div>
          </div>
          <div className="min-w-0 box-border">
            <div className="text-xs text-[var(--color-on-surface-variant)] font-medium mb-1 uppercase tracking-wider">Points</div>
            <div className="text-sm font-medium text-[var(--color-on-surface)]">{assignment.max_score}</div>
          </div>
          <div className="min-w-0 box-border">
            <div className="text-xs text-[var(--color-on-surface-variant)] font-medium mb-1 uppercase tracking-wider">Submission</div>
            <div className="text-sm font-medium text-[var(--color-on-surface)] capitalize truncate">
              {assignment.submission_type.replace(/_/g, ' ')}
            </div>
          </div>
          <div className="min-w-0 box-border">
            <div className="text-xs text-[var(--color-on-surface-variant)] font-medium mb-1 uppercase tracking-wider">Late Allowed</div>
            <div className="text-sm font-medium text-[var(--color-on-surface)]">
              {assignment.allow_late_submission ? 'Yes' : 'No'}
            </div>
          </div>
        </div>

        {assignment.instructions && (
          <div className="w-full min-w-0 box-border">
            <h4 className="text-sm font-bold text-[var(--color-on-surface)] mb-2 uppercase tracking-wider">Instructions</h4>
            <div className="prose prose-sm max-w-none text-[var(--color-on-surface)] whitespace-pre-wrap">
              {assignment.instructions}
            </div>
          </div>
        )}

        {isStudent && (
          <div className="pt-6 border-t border-[var(--color-divider)] w-full min-w-0 box-border">
            <h4 className="text-lg font-bold text-[var(--color-on-surface)] mb-4">Your Work</h4>
            
            {isLoading ? (
              <div className="flex items-center justify-center p-8 w-full box-border">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent"></div>
              </div>
            ) : submission ? (
              <SubmissionDetails 
                submission={submission}
                onDownloadFile={handleDownload}
                downloadError={downloadError}
              />
            ) : (
              <p className="text-sm text-[var(--color-on-surface-variant)] p-4 bg-[var(--color-surface-container-lowest)] rounded-lg border border-dashed border-[var(--color-outline-variant)] text-center w-full box-border">
                You have not submitted anything for this assignment yet.
              </p>
            )}

            {availability?.submissionClosed && !submission && (
              <p className="mt-4 text-sm text-[var(--color-on-surface-variant)] text-center w-full box-border">
                This assignment is no longer accepting submissions.
              </p>
            )}
          </div>
        )}
      </div>
    </AppModal>
  );
}
