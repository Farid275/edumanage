import { MetricCard } from '../../dashboard/components/MetricCard';

export function AssignmentSummary({ total = 0, published = 0, draft = 0, closed = 0, showDrafts = true }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      <MetricCard title="Total Assignments" value={total} icon="assignment" />
      <MetricCard title="Published" value={published} icon="publish" />
      {showDrafts && <MetricCard title="Draft" value={draft} icon="edit_note" />}
      <MetricCard title="Closed" value={closed} icon="event_busy" />
    </div>
  );
}
