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
  { value: 'suspended', label: 'Suspended' },
  { value: 'graduated', label: 'Graduated' },
];

export function StudentToolbar({ 
  searchQuery, 
  setSearchQuery, 
  programFilter, 
  setProgramFilter, 
  statusFilter, 
  setStatusFilter 
}) {
  const handleReset = () => {
    setSearchQuery('');
    setProgramFilter('');
    setStatusFilter('');
  };

  const hasActiveFilters = searchQuery !== '' || programFilter !== '' || statusFilter !== '';

  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1 min-w-0">
          <label htmlFor="student-search" className="sr-only">Search students</label>
          <Input 
            id="student-search"
            icon="search" 
            placeholder="Search by name, program, or student number…"
            className="h-9 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <label htmlFor="student-program" className="sr-only">Filter by program</label>
          <Select 
            id="student-program" 
            options={programOptions} 
            className="text-sm min-w-[160px]" 
            value={programFilter}
            onChange={setProgramFilter}
          />
          <label htmlFor="student-status" className="sr-only">Filter by status</label>
          <Select 
            id="student-status" 
            options={statusOptions} 
            className="text-sm min-w-[120px]" 
            value={statusFilter}
            onChange={setStatusFilter}
          />
          {hasActiveFilters && (
            <button 
              type="button"
              onClick={handleReset}
              className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors whitespace-nowrap px-2"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
