import AppStateView from './AppStateView';

export function EmptyState({
  icon = 'inbox',
  title = 'No Data',
  description = 'There is nothing to show here.',
  action,
  className = "",
}) {
  return (
    <AppStateView
      icon={icon}
      title={title}
      description={description}
      action={action}
      className={`border-2 border-dashed border-[var(--color-outline-variant)] rounded-xl ${className}`}
    />
  );
}
