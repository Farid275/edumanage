import { MetricCard } from '../../dashboard/components/MetricCard';

export function AssignmentSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      <MetricCard title="Total Assignments" value="0" icon="assignment" />
      <MetricCard title="Published" value="0" icon="publish" />
      <MetricCard title="Draft" value="0" icon="edit_note" />
      <MetricCard title="Closed" value="—" icon="event_busy" />
    </div>
  );
}
