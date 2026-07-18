import { MetricCard } from '../../dashboard/components/MetricCard';

export function StudentSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      <MetricCard title="Total Students" value="0" icon="groups" />
      <MetricCard title="Active Students" value="0" icon="person" />
      <MetricCard title="Inactive Students" value="0" icon="person_off" />
      <MetricCard title="Graduated Students" value="—" icon="school" />
    </div>
  );
}
