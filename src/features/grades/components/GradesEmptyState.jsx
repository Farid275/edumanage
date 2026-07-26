import { EmptyState } from '../../../components/feedback/EmptyState';

export function GradesEmptyState({ role, searchTerm, courseFilter, assignmentFilter }) {
  const isLecturer = role === 'lecturer';
  
  const hasFilters = Boolean(searchTerm || courseFilter || assignmentFilter);

  const icon = isLecturer ? (hasFilters ? 'search_off' : 'assignment_turned_in') : 'school';
  const title = isLecturer 
    ? (hasFilters ? 'No Submissions Found' : 'No Submissions to Grade') 
    : 'No Grades Available';
  
  const description = isLecturer
    ? (hasFilters 
        ? 'Try adjusting your filters or search terms to find what you are looking for.' 
        : 'You have no student submissions across your active courses yet.')
    : 'You do not have any published grades yet. Grades will appear here once your lecturer publishes them.';

  return (
    <div className="w-full min-w-0 box-border bg-[var(--color-surface-container-lowest)] rounded-xl">
      <EmptyState
        icon={icon}
        title={title}
        description={description}
        className="border-none"
      />
    </div>
  );
}
