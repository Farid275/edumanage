import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';

const courseOptions = [
  { value: '', label: 'All Courses' },
];

const typeOptions = [
  { value: '', label: 'All Types' },
  { value: 'document', label: 'Document' },
  { value: 'slide', label: 'Slide' },
  { value: 'video', label: 'Video' },
  { value: 'link', label: 'Link' },
  { value: 'other', label: 'Other' },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];

export function MaterialToolbar() {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-4 mb-6">
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
          <label htmlFor="material-search" className="sr-only">Search materials</label>
          <Input
            id="material-search"
            icon="search"
            placeholder="Search resources…"
            className="h-9 text-sm w-full sm:w-56"
          />
          <label htmlFor="material-course" className="sr-only">Filter by course</label>
          <Select id="material-course" options={courseOptions} className="text-sm min-w-[150px]" />
          <label htmlFor="material-type" className="sr-only">Filter by type</label>
          <Select id="material-type" options={typeOptions} className="text-sm min-w-[130px]" />
          <label htmlFor="material-status" className="sr-only">Filter by status</label>
          <Select id="material-status" options={statusOptions} className="text-sm min-w-[120px]" />
          <button
            type="button"
            className="text-xs font-medium text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] transition-colors whitespace-nowrap px-2"
          >
            Reset
          </button>
        </div>
        
        {/* View Controls */}
        <div className="flex items-center gap-1 xl:border-l xl:border-[var(--color-outline-variant)] xl:pl-3 flex-shrink-0">
          <Button variant="ghost" className="h-8 w-8 !p-0 rounded-md bg-[var(--color-surface-container)] text-[var(--color-on-surface)]" aria-label="List view">
            <span className="material-symbols-outlined text-[18px]">view_list</span>
          </Button>
          <Button variant="ghost" className="h-8 w-8 !p-0 rounded-md text-[var(--color-outline)] hover:text-[var(--color-on-surface)]" aria-label="Grid view">
            <span className="material-symbols-outlined text-[18px]">grid_view</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
