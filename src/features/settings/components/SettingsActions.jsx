import { Button } from '../../../components/ui/Button';

export function SettingsActions() {
    return (
        <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-[var(--color-outline-variant)]">
            <Button variant="ghost" className="h-9 px-4 text-xs font-medium">Cancel</Button>
            <Button className="h-9 px-5 text-xs font-medium opacity-60 cursor-not-allowed">Save Changes</Button>
        </div>
    );
}
