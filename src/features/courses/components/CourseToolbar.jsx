import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';

const semesterOptions = [
  { value: '', label: 'All Semesters' },
  { value: 'fall-2025', label: 'Fall 2025' },
  { value: 'spring-2025', label: 'Spring 2025' },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'archived', label: 'Archived' },
];

export function CourseToolbar({ 
  searchQuery, 
  setSearchQuery, 
  semesterFilter, 
  setSemesterFilter, 
  statusFilter, 
  setStatusFilter 
}) {
  const handleReset = () => {
    setSearchQuery('');
    setSemesterFilter('');
    setStatusFilter('');
  };

  const hasActiveFilters = searchQuery !== '' || semesterFilter !== '' || statusFilter !== '';

  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1 min-w-0">
          <Input 
            icon="search" 
            placeholder="Search courses by name, code or lecturer…"
            className="h-9 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Select 
            options={semesterOptions} 
            className="text-sm min-w-[140px]" 
            value={semesterFilter}
            onChange={setSemesterFilter}
          />
          <Select 
            options={statusOptions} 
            className="text-sm min-w-[120px]" 
            value={statusFilter}
            onChange={setStatusFilter}
          />
          {hasActiveFilters && (
            <button 
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
