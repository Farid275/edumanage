import { PageHeader } from '../../../components/ui/PageHeader';
import { SettingsNavigation } from '../components/SettingsNavigation';
import { ProfileSettingsForm } from '../components/ProfileSettingsForm';
import { PreferencesSettings } from '../components/PreferencesSettings';
import { NotificationSettings } from '../components/NotificationSettings';
import { SecuritySettings } from '../components/SecuritySettings';
import { SettingsActions } from '../components/SettingsActions';

export function SettingsPage() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <PageHeader
        title="Settings"
        description="Manage your profile and application preferences."
      />

      <div className="grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] gap-8 mt-6 items-start">
        <aside className="w-full">
          <SettingsNavigation />
        </aside>

        <div className="w-full min-w-0 max-w-[920px]">
          {/* Active section: Profile */}
          <div id="settings-profile">
            <ProfileSettingsForm />
            <PreferencesSettings />
            <NotificationSettings />
            <SecuritySettings />
            
            <SettingsActions />
          </div>
        </div>
      </div>
    </div>
  );
}
