import AppStateView from './AppStateView';

export function ErrorState({ title = 'An error occurred', message = 'Something went wrong.' }) {
  return (
    <AppStateView
      icon={<span className="material-symbols-outlined text-[48px] text-[var(--color-error)]">error</span>}
      title={title}
      description={message}
      className="text-[var(--color-error)] border-2 border-dashed border-[var(--color-error)]/20 bg-[var(--color-error-container)]/10 rounded-xl"
    />
  );
}
