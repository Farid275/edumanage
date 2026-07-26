import { isDateInPast } from "../../assignments/utils/dateUtils";

/**
 * Derives submission state and actions for a student assignment.
 * 
 * @param {Object} assignment - The assignment object
 * @param {Object|null} submission - The student's submission record (if any)
 * @returns {Object} { hasSubmission, canSubmit, canResubmit, submissionClosed, actionLabel }
 */
export function getSubmissionAvailability(assignment, submission) {
  const hasSubmission = !!submission;
  const isPastDue = isDateInPast(assignment.due_at);
  const isOpen = assignment.status === "published";
  
  // Can submit if published AND (before deadline OR late submission allowed)
  const isSubmissionPermitted = isOpen && (!isPastDue || assignment.allow_late_submission);
  
  const canSubmit = !hasSubmission && isSubmissionPermitted;
  const canResubmit = hasSubmission && isSubmissionPermitted;
  
  // Closed if not published, or past deadline without late submission
  const submissionClosed = !isOpen || (isPastDue && !assignment.allow_late_submission);

  let actionLabel = "View";
  
  if (hasSubmission) {
    actionLabel = canResubmit ? "Update Submission" : "View Submission";
  } else {
    if (canSubmit) {
      actionLabel = "Submit Assignment";
    }
  }

  return {
    hasSubmission,
    canSubmit,
    canResubmit,
    submissionClosed,
    actionLabel,
  };
}
