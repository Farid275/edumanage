export function PageHeader({ title, description, action }) {
  return (
    <section className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-[var(--color-outline-variant)] pb-6">
      <div className="flex-1 max-w-4xl">
        <h2 className="font-display-lg text-2xl md:text-3xl font-semibold text-[var(--color-on-surface)] mb-2 tracking-tight">{title}</h2>
        {description && <p className="font-body-lg text-base md:text-lg text-[var(--color-on-surface-variant)] leading-relaxed">{description}</p>}
      </div>
      {action && (
        <div className="shrink-0 mt-2 md:mt-0">
          {action}
        </div>
      )}
    </section>
  );
}
