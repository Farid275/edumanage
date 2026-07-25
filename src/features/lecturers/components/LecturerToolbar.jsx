import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';

const departmentOptions = [
  { value: '', label: 'All Departments' },
  { value: 'cs', label: 'Computer Science' },
  { value: 'ee', label: 'Electrical Engineering' },
  { value: 'ba', label: 'Business Administration' },
  { value: 'math', label: 'Mathematics' },
  { value: 'physics', label: 'Physics' },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'on_leave', label: 'On Leave' },
];

export function LecturerToolbar({
  searchQuery,
  setSearchQuery,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
}) {
  const handleReset = () => {
    setSearchQuery('');
    setDepartmentFilter('');
    setStatusFilter('');
  };

  const isFiltered = searchQuery || departmentFilter || statusFilter;

  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1 min-w-0">
          <label htmlFor="lecturer-search" className="sr-only">Search lecturers</label>
          <Input
            id="lecturer-search"
            icon="search"
            placeholder="Search by name, number, department..."
            className="h-9 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <label htmlFor="lecturer-department" className="sr-only">Filter by department</label>
          <Select 
            id="lecturer-department" 
            options={departmentOptions} 
            className="text-sm min-w-[170px]" 
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          />
          <label htmlFor="lecturer-status" className="sr-only">Filter by status</label>
          <Select 
            id="lecturer-status" 
            options={statusOptions} 
            className="text-sm min-w-[120px]" 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
          {isFiltered && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-medium text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] transition-colors whitespace-nowrap px-2"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
