import { useEffect } from "react";
import { createPortal } from "react-dom";
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
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isSaving) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isSaving, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close Course dialog"
        className="absolute inset-0 bg-slate-950/50 cursor-default"
        onClick={() => {
          if (!isSaving) onClose();
        }}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-form-modal-title"
        className="
          relative z-10 block min-w-0 overflow-hidden rounded-xl
          border border-[var(--color-outline-variant)]
          bg-[var(--color-surface)] shadow-2xl
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
            border-b border-[var(--color-divider)] px-6 py-5
          "
        >
          <div className="min-w-0">
            <h2
              id="course-form-modal-title"
              className="text-xl font-semibold text-[var(--color-on-surface)]"
            >
              {mode === "edit" ? "Edit Course" : "Add Course"}
            </h2>

            <p className="mt-1 text-sm text-[var(--color-on-surface-variant)]">
              {mode === "edit"
                ? "Update the course information and lecturer assignment."
                : "Create a course and optionally assign a lecturer."}
            </p>
          </div>

          <button
            type="button"
            aria-label="Close dialog"
            disabled={isSaving}
            onClick={onClose}
            className="
              shrink-0 rounded-md p-2 -mt-2 -mr-2
              text-[var(--color-on-surface-variant)]
              hover:bg-[var(--color-surface-container-low)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--color-focus-ring)]
              disabled:opacity-50
            "
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </header>

        <div
          className="w-full min-w-0 overflow-y-auto px-6 py-6"
          style={{
            maxHeight: "calc(100vh - 180px)",
            boxSizing: "border-box",
          }}
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
        </div>
      </section>
    </div>,
    document.body
  );
}
