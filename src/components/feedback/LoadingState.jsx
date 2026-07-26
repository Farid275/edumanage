import AppStateView from './AppStateView';

export function LoadingState({ message = 'Loading...' }) {
  return (
    <AppStateView
      icon={<span className="material-symbols-outlined animate-spin text-[32px]">progress_activity</span>}
      title={message}
      description=""
      className="text-[var(--color-on-surface-variant)]"
    />
  );
}
