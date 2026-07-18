import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';

const courseOptions = [
  { value: '', label: 'Select Course' },
];

const assignmentOptions = [
  { value: '', label: 'Select Assignment' },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
];

export function GradeToolbar() {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
          <label htmlFor="grade-course" className="sr-only">Select course</label>
          <Select id="grade-course" options={courseOptions} className="text-sm min-w-[180px]" />
          <label htmlFor="grade-assignment" className="sr-only">Select assignment</label>
          <Select id="grade-assignment" options={assignmentOptions} className="text-sm min-w-[180px]" />
          <label htmlFor="grade-status" className="sr-only">Filter by status</label>
          <Select id="grade-status" options={statusOptions} className="text-sm min-w-[120px]" />
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <label htmlFor="grade-search" className="sr-only">Search students</label>
          <Input
            id="grade-search"
            icon="search"
            placeholder="Search student…"
            className="h-9 text-sm w-full sm:w-48"
          />
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
