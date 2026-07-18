import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';

const courseOptions = [
  { value: '', label: 'Select Course' },
];

const sessionOptions = [
  { value: '', label: 'Select Session Date' },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'present', label: 'Present' },
  { value: 'late', label: 'Late' },
  { value: 'absent', label: 'Absent' },
  { value: 'excused', label: 'Excused' },
];

export function AttendanceToolbar() {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
          <label htmlFor="attendance-course" className="sr-only">Select course</label>
          <Select id="attendance-course" options={courseOptions} className="text-sm min-w-[180px]" />
          <label htmlFor="attendance-session" className="sr-only">Select session date</label>
          <Select id="attendance-session" options={sessionOptions} className="text-sm min-w-[170px]" />
          <label htmlFor="attendance-status" className="sr-only">Filter by status</label>
          <Select id="attendance-status" options={statusOptions} className="text-sm min-w-[120px]" />
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <label htmlFor="attendance-search" className="sr-only">Search students</label>
          <Input
            id="attendance-search"
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
