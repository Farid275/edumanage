import { MetricCard } from '../../dashboard/components/MetricCard';

export function CourseSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
      <MetricCard title="Total Courses" value="0" icon="menu_book" />
      <MetricCard title="Active Courses" value="0" icon="check_circle" />
      <MetricCard title="Archived Courses" value="0" icon="inventory_2" />
    </div>
  );
}
