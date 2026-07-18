export function ActivityList({ message = 'No recent academic activity.', icon = 'history' }) {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-8 py-16 flex flex-col items-center justify-center text-center gap-2">
      <span className="material-symbols-outlined text-[20px] text-[var(--color-outline)] opacity-70">{icon}</span>
      <p className="font-body-sm text-sm text-[var(--color-on-surface-variant)]">{message}</p>
    </div>
  );
}
