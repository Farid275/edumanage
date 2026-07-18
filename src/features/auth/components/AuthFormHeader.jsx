export function AuthFormHeader({ title, subtitle }) {
  return (
    <div className="auth-card-header">
      <h2 className="font-display-sm text-2xl font-bold text-[var(--color-on-surface)] mb-1 tracking-tight">{title}</h2>
      {subtitle && <p className="font-body-md text-sm text-[var(--color-on-surface-variant)]">{subtitle}</p>}
    </div>
  );
}
