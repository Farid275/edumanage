import { MetricCard } from '../../dashboard/components/MetricCard';

export function LecturerSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      <MetricCard title="Total Lecturers" value="0" icon="supervisor_account" />
      <MetricCard title="Active Lecturers" value="0" icon="person" />
      <MetricCard title="Inactive Lecturers" value="0" icon="person_off" />
      <MetricCard title="Assigned Courses" value="—" icon="menu_book" />
    </div>
  );
}
