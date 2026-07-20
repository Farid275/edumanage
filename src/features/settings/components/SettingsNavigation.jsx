export function SettingsNavigation() {
  const tabs = [
    { id: 'profile', label: 'Profile', active: true },
    { id: 'preferences', label: 'Preferences', active: false },
    { id: 'notifications', label: 'Notifications', active: false },
    { id: 'security', label: 'Security', active: false },
  ];

  return (
    <nav className="flex md:flex-col overflow-x-auto md:overflow-visible space-x-6 md:space-x-0 md:space-y-1 pb-4 md:pb-0 min-w-max md:min-w-[200px] border-b md:border-b-0 md:border-r border-[var(--color-outline-variant)] md:pr-6" aria-label="Settings Navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`whitespace-nowrap text-left px-3 py-2.5 rounded-lg font-label-md text-sm transition-colors ${
            tab.active
              ? 'bg-[var(--color-surface-container)] text-[var(--color-primary)] font-semibold'
              : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container-low)]'
          }`}
          aria-current={tab.active ? 'page' : undefined}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
