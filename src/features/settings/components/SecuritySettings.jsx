import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export function SecuritySettings() {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-6 md:p-8 mt-6">
      <div className="mb-6 pb-4 border-b border-[var(--color-outline-variant)]">
        <h3 className="font-headline-sm text-base font-semibold text-[var(--color-on-surface)]">Security</h3>
        <p className="font-body-sm text-xs text-[var(--color-on-surface-variant)] mt-0.5">Manage your password and active sessions.</p>
      </div>

      <div className="w-full max-w-[680px] mx-auto flex flex-col gap-4 mb-2">
        <h4 className="font-label-md text-sm font-semibold text-[var(--color-on-surface)]">Change Password</h4>
        
        <div className="flex flex-col gap-4 w-full">
            <div className="w-full min-w-0">
                <label htmlFor="sec-current" className="block font-label-md text-xs font-semibold text-[var(--color-on-surface)] mb-1.5">Current Password</label>
                <Input id="sec-current" type="password" placeholder="••••••••" className="w-full" />
            </div>
            <div className="w-full min-w-0">
                <label htmlFor="sec-new" className="block font-label-md text-xs font-semibold text-[var(--color-on-surface)] mb-1.5">New Password</label>
                <Input id="sec-new" type="password" placeholder="••••••••" className="w-full" />
            </div>
            <div className="w-full min-w-0">
                <label htmlFor="sec-confirm" className="block font-label-md text-xs font-semibold text-[var(--color-on-surface)] mb-1.5">Confirm New Password</label>
                <Input id="sec-confirm" type="password" placeholder="••••••••" className="w-full" />
            </div>
            
            <div className="pt-2 flex justify-start w-full">
                <Button variant="secondary" className="min-h-[44px] px-5 whitespace-nowrap text-sm font-medium">Update Password</Button>
            </div>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-[var(--color-outline-variant)] w-full flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="min-w-0">
              <h4 className="font-label-md text-sm font-semibold text-[var(--color-on-surface)] mb-1.5">Active Sessions</h4>
              <p className="font-body-sm text-xs text-[var(--color-outline)] whitespace-normal">
                  Sign out of other sessions where your account is currently active.
              </p>
          </div>
          <Button variant="ghost" className="min-h-[44px] px-5 flex-shrink-0 whitespace-nowrap text-sm font-medium border border-[var(--color-outline-variant)] text-[var(--color-on-surface-variant)]">
              Sign Out Other Sessions
          </Button>
      </div>
    </div>
  );
}
