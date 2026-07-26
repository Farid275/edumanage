import { EmptyState } from '../../../components/feedback/EmptyState';

export function StudentsEmptyState() {
  return (
    <EmptyState
      icon="groups"
      title="No student records are available yet."
      description="Students added by administrators will appear here."
      className="border-none"
    />
  );
}
