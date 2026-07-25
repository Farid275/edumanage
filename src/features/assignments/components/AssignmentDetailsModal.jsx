import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "../../../components/ui/Button";

export function AssignmentDetailsModal({
  isOpen,
  assignment,
  onClose,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !assignment) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      aria-hidden="false"
    >
      <button
        type="button"
        aria-label="Close details modal"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/50 cursor-default"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="assignment-details-title"
        className="
          relative z-10 block min-w-0
          overflow-hidden rounded-xl
          border border-[var(--color-outline-variant)]
          bg-[var(--color-surface)]
          shadow-2xl
        "
        style={{
          width: "min(720px, calc(100vw - 32px))",
          maxWidth: "720px",
          minWidth: "320px",
          maxHeight: "calc(100vh - 32px)",
          flex: "0 0 auto",
          boxSizing: "border-box",
        }}
      >
        <header
          className="
            flex w-full min-w-0 items-start justify-between gap-4
            border-b border-[var(--color-divider)]
            px-6 py-5
          "
        >
          <div className="min-w-0">
            <h2
              id="assignment-details-title"
              className="text-xl font-semibold text-[var(--color-on-surface)]"
            >
              Assignment Details
            </h2>

            <p className="mt-1 text-sm text-[var(--color-on-surface-variant)]">
              {assignment.course_code} - {assignment.course_name}
            </p>
          </div>

          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="
              shrink-0 rounded-md p-2 -mt-2 -mr-2
              text-[var(--color-on-surface-variant)]
              hover:bg-[var(--color-surface-container-low)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--color-focus-ring)]
            "
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </header>

        <div
          className="w-full min-w-0 overflow-y-auto px-6 py-6 space-y-6"
          style={{
            maxHeight: "calc(100vh - 190px)",
            boxSizing: "border-box",
          }}
        >
          <div>
            <h3 className="text-2xl font-bold text-[var(--color-on-surface)] mb-2">{assignment.title}</h3>
            {assignment.description && (
              <p className="text-sm text-[var(--color-on-surface-variant)]">{assignment.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)]">
            <div>
              <div className="text-xs text-[var(--color-on-surface-variant)] font-medium mb-1 uppercase tracking-wider">Due Date</div>
              <div className="text-sm font-medium text-[var(--color-on-surface)]">
                {new Date(assignment.due_at).toLocaleDateString(undefined, { 
                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                })}
              </div>
            </div>
            <div>
              <div className="text-xs text-[var(--color-on-surface-variant)] font-medium mb-1 uppercase tracking-wider">Points</div>
              <div className="text-sm font-medium text-[var(--color-on-surface)]">{assignment.max_score}</div>
            </div>
            <div>
              <div className="text-xs text-[var(--color-on-surface-variant)] font-medium mb-1 uppercase tracking-wider">Submission</div>
              <div className="text-sm font-medium text-[var(--color-on-surface)] capitalize">
                {assignment.submission_type.replace(/_/g, ' ')}
              </div>
            </div>
            <div>
              <div className="text-xs text-[var(--color-on-surface-variant)] font-medium mb-1 uppercase tracking-wider">Late Allowed</div>
              <div className="text-sm font-medium text-[var(--color-on-surface)]">
                {assignment.allow_late_submission ? 'Yes' : 'No'}
              </div>
            </div>
          </div>

          {assignment.instructions && (
            <div>
              <h4 className="text-sm font-bold text-[var(--color-on-surface)] mb-2 uppercase tracking-wider">Instructions</h4>
              <div className="prose prose-sm max-w-none text-[var(--color-on-surface)] whitespace-pre-wrap">
                {assignment.instructions}
              </div>
            </div>
          )}

        </div>

        <footer className="px-6 py-4 border-t border-[var(--color-divider)] flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </footer>
      </section>
    </div>,
    document.body
  );
}
