import { MetricCard } from '../../dashboard/components/MetricCard';

export function LecturerSummary({ total = 0, active = 0, onLeave = 0, totalCourses = 0 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      <MetricCard title="Total Lecturers" value={total} icon="supervisor_account" />
      <MetricCard title="Active Lecturers" value={active} icon="person" />
      <MetricCard title="On Leave" value={onLeave} icon="event_busy" />
      <MetricCard title="Assigned Courses" value={totalCourses} icon="menu_book" />
    </div>
  );
}
