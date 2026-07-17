export function Card({ children, className = '' }) {
  return (
    <div className={`bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-6 ${className}`}>
      {children}
    </div>
  );
}
