export function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-[var(--color-on-surface-variant)]">
      <span className="material-symbols-outlined animate-spin text-[32px] mb-4">progress_activity</span>
      <p className="font-label-md">{message}</p>
    </div>
  );
}
