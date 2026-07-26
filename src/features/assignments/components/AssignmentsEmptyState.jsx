import { EmptyState } from '../../../components/feedback/EmptyState';

export function AssignmentsEmptyState() {
  return (
    <EmptyState
      icon="assignment"
      title="No assignments are available yet."
      description="Assignments created by lecturers or administrators will appear here."
      className="border-none"
    />
  );
}
