import { MetricCard } from '../../dashboard/components/MetricCard';

export function ReportSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      <MetricCard title="Total Students" value="0" icon="groups" />
      <MetricCard title="Total Courses" value="0" icon="menu_book" />
      <MetricCard title="Average Attendance" value="—" icon="fact_check" />
      <MetricCard title="Average Grade" value="—" icon="analytics" />
    </div>
  );
}
