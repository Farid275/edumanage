import { EmptyState } from '../../../components/feedback/EmptyState';

export function MaterialsEmptyState() {
  return (
    <EmptyState
      icon="snippet_folder"
      title="No learning materials are available yet."
      description="Materials shared by lecturers or administrators will appear here."
      className="border-none"
    />
  );
}
