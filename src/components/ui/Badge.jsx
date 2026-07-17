export function Badge({ children, status, className = '' }) {
  const base = "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-label-md text-label-md border";
  const statusStyles = {
    active: "bg-[var(--color-secondary-container)]/30 text-[var(--color-on-secondary-container)] border-[var(--color-secondary-container)]/50",
    inactive: "bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] border-[var(--color-outline-variant)]/50",
    neutral: "bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)] border-transparent"
  };
  const dotColors = {
    active: "bg-[var(--color-secondary)]",
    inactive: "bg-[var(--color-outline)]",
    neutral: "bg-transparent"
  };
  return (
    <span className={`${base} ${statusStyles[status] || statusStyles.neutral} ${className}`}>
      {status && status !== 'neutral' && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[status]}`}></span>
      )}
      {children}
    </span>
  );
}
