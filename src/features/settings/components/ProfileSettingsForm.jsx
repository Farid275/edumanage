import { Input } from '../../../components/ui/Input';

export function ProfileSettingsForm() {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-6 md:p-8">
      <div className="mb-6 pb-4 border-b border-[var(--color-outline-variant)]">
        <h3 className="font-headline-sm text-base font-semibold text-[var(--color-on-surface)]">Profile Information</h3>
        <p className="font-body-sm text-xs text-[var(--color-on-surface-variant)] mt-0.5">Manage your personal details and public profile.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-[var(--color-surface-container-high)] border border-[var(--color-outline-variant)] rounded-xl flex items-center justify-center text-[var(--color-on-surface-variant)] font-headline-md text-xl">
            UN
          </div>
        </div>
        <div>
          <button type="button" className="text-sm font-label-md text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors mb-1">
            Change Photo
          </button>
          <p className="font-body-sm text-xs text-[var(--color-outline)]">
            JPG, GIF or PNG. 1MB max.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
            <label htmlFor="settings-name" className="block font-label-md text-xs font-semibold text-[var(--color-on-surface)] mb-1.5">Full Name</label>
            <Input id="settings-name" defaultValue="User Name" />
        </div>
        
        <div>
            <label htmlFor="settings-email" className="block font-label-md text-xs font-semibold text-[var(--color-on-surface)] mb-1.5">Email Address</label>
            <Input id="settings-email" defaultValue="user@example.com" disabled />
            <p className="font-body-sm text-xs text-[var(--color-outline)] mt-1.5">Email cannot be changed directly.</p>
        </div>
        
        <div>
            <label htmlFor="settings-role" className="block font-label-md text-xs font-semibold text-[var(--color-on-surface)] mb-1.5">System Role</label>
            <Input id="settings-role" defaultValue="Role not assigned" disabled />
        </div>
      </div>
    </div>
  );
}
