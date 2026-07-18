import { MetricCard } from '../../dashboard/components/MetricCard';

export function MaterialSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      <MetricCard title="Total Materials" value="0" icon="folder_copy" />
      <MetricCard title="Published" value="0" icon="cloud_done" />
      <MetricCard title="Draft" value="0" icon="cloud_upload" />
      <MetricCard title="Archived" value="—" icon="archive" />
    </div>
  );
}
