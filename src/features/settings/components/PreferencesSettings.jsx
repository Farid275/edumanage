import { Select } from '../../../components/ui/Select';

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'id', label: 'Indonesian' },
];

const timezoneOptions = [
  { value: 'Asia/Jakarta', label: 'Asia/Jakarta' },
];

const themeOptions = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
];

export function PreferencesSettings() {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-6 md:p-8 mt-6">
      <div className="mb-6 pb-4 border-b border-[var(--color-outline-variant)]">
        <h3 className="font-headline-sm text-base font-semibold text-[var(--color-on-surface)]">Application Preferences</h3>
        <p className="font-body-sm text-xs text-[var(--color-on-surface-variant)] mt-0.5">Customize your regional and visual settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label htmlFor="pref-language" className="block font-label-md text-xs font-semibold text-[var(--color-on-surface)] mb-1.5">Language</label>
            <Select id="pref-language" options={languageOptions} defaultValue="en" />
        </div>
        
        <div>
            <label htmlFor="pref-timezone" className="block font-label-md text-xs font-semibold text-[var(--color-on-surface)] mb-1.5">Timezone</label>
            <Select id="pref-timezone" options={timezoneOptions} defaultValue="Asia/Jakarta" />
        </div>
        
        <div>
            <label htmlFor="pref-theme" className="block font-label-md text-xs font-semibold text-[var(--color-on-surface)] mb-1.5">Theme Preference</label>
            <Select id="pref-theme" options={themeOptions} defaultValue="system" />
        </div>
      </div>
    </div>
  );
}
