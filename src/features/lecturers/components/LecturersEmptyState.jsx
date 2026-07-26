import { EmptyState } from '../../../components/feedback/EmptyState';

export function LecturersEmptyState() {
  return (
    <EmptyState
      icon="supervisor_account"
      title="No lecturer records are available yet."
      description="Lecturers added by administrators will appear here."
      className="border-none"
    />
  );
}
