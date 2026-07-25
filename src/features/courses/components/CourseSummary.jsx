import { MetricCard } from '../../dashboard/components/MetricCard';

export function CourseSummary({ total = 0, active = 0, archived = 0 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
      <MetricCard title="Total Courses" value={total} icon="menu_book" />
      <MetricCard title="Active Courses" value={active} icon="check_circle" />
      <MetricCard title="Archived Courses" value={archived} icon="inventory_2" />
    </div>
  );
}
