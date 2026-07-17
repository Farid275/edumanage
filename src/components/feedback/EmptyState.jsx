export function EmptyState({ icon = 'inbox', title = 'No Data', description = 'There is nothing to show here.' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center text-[var(--color-on-surface-variant)] border-2 border-dashed border-[var(--color-outline-variant)] rounded-xl">
      <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">{icon}</span>
      <h3 className="font-title-lg text-[var(--color-on-surface)] mb-2">{title}</h3>
      <p className="max-w-md">{description}</p>
    </div>
  );
}
