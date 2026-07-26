import { EmptyState } from '../../../components/feedback/EmptyState';

export function CoursesEmptyState() {
  return (
    <EmptyState
      icon="menu_book"
      title="No courses are available yet."
      description="Courses created by administrators will appear here."
      className="border-none"
    />
  );
}
