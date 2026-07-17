export function PageHeader({ title, description, action }) {
  return (
    <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
      <div>
        <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-[var(--color-on-surface)] mb-2">{title}</h2>
        {description && <p className="font-body-lg text-body-lg text-[var(--color-on-surface-variant)] max-w-2xl">{description}</p>}
      </div>
      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </section>
  );
}
