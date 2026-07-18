import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';

const reportTypeOptions = [
  { value: 'overview', label: 'Academic Overview' },
  { value: 'attendance', label: 'Attendance Report' },
  { value: 'grade', label: 'Grade Report' },
  { value: 'assignment', label: 'Assignment Report' },
  { value: 'activity', label: 'Course Activity' },
];

const courseOptions = [
  { value: '', label: 'All Courses' },
];

const periodOptions = [
  { value: '', label: 'All Periods' },
  { value: 'fall2025', label: 'Fall 2025' },
  { value: 'spring2025', label: 'Spring 2025' },
];

const dateRangeOptions = [
  { value: '', label: 'All Dates' },
  { value: 'last30', label: 'Last 30 Days' },
  { value: 'last90', label: 'Last 90 Days' },
  { value: 'year', label: 'This Academic Year' },
];

export function ReportFilters() {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow p-4 mb-6">
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <label htmlFor="report-type" className="sr-only">Report type</label>
          <Select id="report-type" options={reportTypeOptions} className="text-sm min-w-[200px]" />
          <label htmlFor="report-course" className="sr-only">Filter by course</label>
          <Select id="report-course" options={courseOptions} className="text-sm min-w-[150px]" />
          <label htmlFor="report-period" className="sr-only">Filter by academic period</label>
          <Select id="report-period" options={periodOptions} className="text-sm min-w-[150px]" />
          <label htmlFor="report-date" className="sr-only">Filter by date range</label>
          <Select id="report-date" options={dateRangeOptions} className="text-sm min-w-[150px]" />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 mt-3 xl:mt-0 xl:border-l xl:border-[var(--color-outline-variant)] xl:pl-3">
            <Button variant="ghost" className="text-xs h-9 px-3">Reset</Button>
            <Button className="text-xs h-9 px-4">Apply Filters</Button>
        </div>
      </div>
    </div>
  );
}
