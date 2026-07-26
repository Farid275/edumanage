import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalSizes = {
  sm: {
    width: "min(420px, calc(100vw - 32px))",
    maxWidth: "420px",
  },
  md: {
    width: "min(560px, calc(100vw - 32px))",
    maxWidth: "560px",
  },
  lg: {
    width: "min(720px, calc(100vw - 32px))",
    maxWidth: "720px",
  },
  xl: {
    width: "min(960px, calc(100vw - 32px))",
    maxWidth: "960px",
  },
};

export default function AppModal({
  isOpen,
  onClose,
  title,
  description,
  titleId = "app-modal-title",
  size = "lg",
  isBusy = false,
  children,
  footer = null,
  bodyClassName = "",
}) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isBusy) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isBusy, onClose]);

  if (!isOpen) return null;

  const selectedSize = modalSizes[size] ?? modalSizes.lg;

  return createPortal(
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        p-4 sm:p-6
      "
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-slate-950/50 cursor-default"
        onClick={() => {
          if (!isBusy) onClose();
        }}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="
          relative z-10
          block min-w-0
          overflow-hidden
          rounded-xl
          border border-[var(--color-outline-variant)]
          bg-[var(--color-surface)]
          shadow-2xl
        "
        style={{
          width: selectedSize.width,
          maxWidth: selectedSize.maxWidth,
          minWidth: "min(320px, calc(100vw - 32px))",
          maxHeight: "calc(100vh - 32px)",
          flex: "0 0 auto",
          boxSizing: "border-box",
        }}
      >
        <header
          className="
            flex w-full min-w-0
            items-start justify-between gap-4
            border-b border-[var(--color-divider)]
            px-6 py-5
          "
        >
          <div className="min-w-0">
            <h2
              id={titleId}
              className="
                text-xl font-semibold
                text-[var(--color-on-surface)]
              "
            >
              {title}
            </h2>

            {description ? (
              <p
                className="
                  mt-1 text-sm
                  text-[var(--color-on-surface-variant)]
                "
              >
                {description}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            aria-label="Close dialog"
            disabled={isBusy}
            onClick={onClose}
            className="
              shrink-0 rounded-md p-2 -mt-2 -mr-2
              text-[var(--color-on-surface-variant)]
              hover:bg-[var(--color-surface-container-low)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--color-focus-ring)]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </header>

        <div
          className={`
            w-full min-w-0
            overflow-x-hidden overflow-y-auto
            px-6 py-6
            ${bodyClassName}
          `}
          style={{
            maxHeight: footer
              ? "calc(100vh - 145px - 73px)" // Subtracting approx header and footer height
              : "calc(100vh - 145px)", // Subtracting approx header height plus padding
            boxSizing: "border-box",
          }}
        >
          {children}
        </div>

        {footer ? (
          <footer
            className="
              flex w-full min-w-0
              flex-col-reverse gap-3
              border-t border-[var(--color-divider)]
              px-6 py-4
              sm:flex-row sm:justify-end
              bg-[var(--color-surface-container-lowest)]
            "
          >
            {footer}
          </footer>
        ) : null}
      </section>
    </div>,
    document.body
  );
}
