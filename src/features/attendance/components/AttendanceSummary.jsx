import { MetricCard } from '../../dashboard/components/MetricCard';

export function AttendanceSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      <MetricCard title="Total Sessions" value="0" icon="event_note" />
      <MetricCard title="Present" value="0" icon="check_circle" />
      <MetricCard title="Late" value="0" icon="schedule" />
      <MetricCard title="Absent" value="0" icon="cancel" />
    </div>
  );
}
