export function ErrorState({ title = 'An error occurred', message = 'Something went wrong.' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center text-[var(--color-error)] border-2 border-dashed border-[var(--color-error)]/20 bg-[var(--color-error-container)]/10 rounded-xl">
      <span className="material-symbols-outlined text-[48px] mb-4 opacity-80">error</span>
      <h3 className="font-title-lg mb-2">{title}</h3>
      <p className="max-w-md text-[var(--color-on-surface-variant)]">{message}</p>
    </div>
  );
}
