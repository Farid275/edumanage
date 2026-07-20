export function NotificationSettings() {
  const toggles = [
    { id: 'notif-email', label: 'Email Notifications', desc: 'Receive daily summaries and critical alerts via email.' },
    { id: 'notif-assignment', label: 'Assignment Reminders', desc: 'Alerts for upcoming and overdue assignments.' },
    { id: 'notif-attendance', label: 'Attendance Updates', desc: 'Notifications when attendance records are modified.' },
    { id: 'notif-grade', label: 'Grade Notifications', desc: 'Alerts when new grades are published.' },
    { id: 'notif-material', label: 'Learning Material Updates', desc: 'Notifications when new resources are shared.' },
  ];

  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-6 md:p-8 mt-6">
      <div className="mb-6 pb-4 border-b border-[var(--color-outline-variant)]">
        <h3 className="font-headline-sm text-base font-semibold text-[var(--color-on-surface)]">Notifications</h3>
        <p className="font-body-sm text-xs text-[var(--color-on-surface-variant)] mt-0.5">Control how and when you are notified.</p>
      </div>

      <div className="flex flex-col gap-5">
        {toggles.map((toggle) => (
          <div key={toggle.id} className="flex items-center justify-between gap-4">
            <div>
              <label htmlFor={toggle.id} className="block font-label-md text-sm font-medium text-[var(--color-on-surface)]">
                {toggle.label}
              </label>
              <p className="font-body-sm text-xs text-[var(--color-outline)] mt-0.5">
                {toggle.desc}
              </p>
            </div>
            {/* Visual presentation-only toggle */}
            <button
              type="button"
              id={toggle.id}
              role="switch"
              aria-checked="true"
              className="relative inline-flex h-5 w-9 flex-shrink-0 cursor-not-allowed items-center justify-center rounded-full bg-[var(--color-primary)] opacity-50"
            >
              <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white opacity-10 mix-blend-overlay"></span>
              <span aria-hidden="true" className="pointer-events-none absolute mx-auto h-4 w-4 translate-x-2 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
