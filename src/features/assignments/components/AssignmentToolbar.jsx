import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';

const courseOptions = [
  { value: '', label: 'All Courses' },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'closed', label: 'Closed' },
];

const dueDateOptions = [
  { value: '', label: 'Any Due Date' },
  { value: 'today', label: 'Due Today' },
  { value: 'week', label: 'Due This Week' },
  { value: 'overdue', label: 'Overdue' },
];

export function AssignmentToolbar() {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1 min-w-0">
          <label htmlFor="assignment-search" className="sr-only">Search assignments</label>
          <Input
            id="assignment-search"
            icon="search"
            placeholder="Search by title or course…"
            className="h-9 text-sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
          <label htmlFor="assignment-course" className="sr-only">Filter by course</label>
          <Select id="assignment-course" options={courseOptions} className="text-sm min-w-[140px]" />
          <label htmlFor="assignment-status" className="sr-only">Filter by status</label>
          <Select id="assignment-status" options={statusOptions} className="text-sm min-w-[120px]" />
          <label htmlFor="assignment-due" className="sr-only">Filter by due date</label>
          <Select id="assignment-due" options={dueDateOptions} className="text-sm min-w-[140px]" />
          <button
            type="button"
            className="text-xs font-medium text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] transition-colors whitespace-nowrap px-2"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
