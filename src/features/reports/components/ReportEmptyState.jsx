import { EmptyState } from '../../../components/feedback/EmptyState';

export function ReportEmptyState({ message = 'Report data will appear when academic records are available.', icon = 'analytics' }) {
  return (
    <EmptyState
      icon={icon}
      title="No Data"
      description={message}
      className="border-none"
    />
  );
}
