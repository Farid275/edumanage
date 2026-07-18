import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';

const programOptions = [
  { value: '', label: 'All Programs' },
  { value: 'cs', label: 'Computer Science' },
  { value: 'ee', label: 'Electrical Engineering' },
  { value: 'ba', label: 'Business Administration' },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'graduated', label: 'Graduated' },
];

export function StudentToolbar() {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1 min-w-0">
          <label htmlFor="student-search" className="sr-only">Search students</label>
          <Input 
            id="student-search"
            icon="search" 
            placeholder="Search by name, email, or student number…"
            className="h-9 text-sm"
          />
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <label htmlFor="student-program" className="sr-only">Filter by program</label>
          <Select id="student-program" options={programOptions} className="text-sm min-w-[160px]" />
          <label htmlFor="student-status" className="sr-only">Filter by status</label>
          <Select id="student-status" options={statusOptions} className="text-sm min-w-[120px]" />
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
