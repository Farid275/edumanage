import { MetricCard } from '../../dashboard/components/MetricCard';

export function StudentSummary({ total = 0, active = 0, graduated = 0 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
      <MetricCard title="Total Students" value={total} icon="school" />
      <MetricCard title="Active Students" value={active} icon="how_to_reg" />
      <MetricCard title="Graduated" value={graduated} icon="workspace_premium" />
    </div>
  );
}
