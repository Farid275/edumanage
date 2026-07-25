import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';

export function AssignmentToolbar({
  searchQuery,
  setSearchQuery,
  courseFilter,
  setCourseFilter,
  statusFilter,
  setStatusFilter,
  uniqueCourses = [],
  showDrafts = true,
}) {
  const courseOptions = [
    { value: '', label: 'All Courses' },
    ...uniqueCourses.map(c => ({ value: c.id, label: `${c.code} - ${c.name}` }))
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    ...(showDrafts ? [{ value: 'draft', label: 'Draft' }] : []),
    { value: 'published', label: 'Published' },
    { value: 'closed', label: 'Closed' },
  ];

  const handleReset = () => {
    setSearchQuery('');
    setCourseFilter('');
    setStatusFilter('');
  };

  const isFiltered = searchQuery || courseFilter || statusFilter;

  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1 min-w-0">
          <label htmlFor="assignment-search" className="sr-only">Search assignments</label>
          <Input
            id="assignment-search"
            icon="search"
            placeholder="Search by title, course..."
            className="h-9 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
          <label htmlFor="assignment-course" className="sr-only">Filter by course</label>
          <Select 
            id="assignment-course" 
            options={courseOptions} 
            className="text-sm min-w-[140px]" 
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          />
          <label htmlFor="assignment-status" className="sr-only">Filter by status</label>
          <Select 
            id="assignment-status" 
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
