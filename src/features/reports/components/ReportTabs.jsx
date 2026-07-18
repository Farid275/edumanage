export function ReportTabs() {
  const tabs = [
    { id: 'overview', label: 'Overview', active: true },
    { id: 'attendance', label: 'Attendance', active: false },
    { id: 'grades', label: 'Grades', active: false },
    { id: 'assignments', label: 'Assignments', active: false },
    { id: 'activity', label: 'Course Activity', active: false },
  ];

  return (
    <div className="border-b border-[var(--color-outline-variant)] mb-6 overflow-x-auto">
      <nav className="flex space-x-8 min-w-max px-2" aria-label="Report Navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-label-md text-sm transition-colors ${
              tab.active
                ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                : 'border-transparent text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] hover:border-[var(--color-outline)]'
            }`}
            aria-current={tab.active ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
