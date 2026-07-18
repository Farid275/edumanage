import { MetricCard } from '../../dashboard/components/MetricCard';

export function GradeSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      <MetricCard title="Total Grade Records" value="0" icon="grading" />
      <MetricCard title="Average Score" value="—" icon="analytics" />
      <MetricCard title="Published Grades" value="0" icon="fact_check" />
      <MetricCard title="Draft Grades" value="0" icon="edit_document" />
    </div>
  );
}
