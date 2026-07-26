import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';

export function GradesToolbar({
  role,
  searchTerm,
  setSearchTerm,
  courseFilter,
  setCourseFilter,
  assignmentFilter,
  setAssignmentFilter,
  statusFilter,
  setStatusFilter,
  uniqueCourses,
  uniqueAssignments
}) {
  if (role !== 'lecturer') return null;

  const courseOptions = [
    { value: '', label: 'All Courses' },
    ...uniqueCourses.map(c => ({ value: c.id, label: `${c.course_code} - ${c.course_name}` }))
  ];

  const assignmentOptions = [
    { value: '', label: 'All Assignments' },
    ...uniqueAssignments.map(a => ({ value: a.id, label: a.title }))
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'ungraded', label: 'Needs Grading' },
    { value: 'graded', label: 'Graded (Any)' },
    { value: 'draft', label: 'Draft Grades' },
    { value: 'published', label: 'Published Grades' }
  ];

  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl p-4 md:p-5 mb-8 w-full min-w-0 flex flex-col md:flex-row items-center gap-4 box-border">
      <div className="flex-1 w-full min-w-0">
        <Input 
          type="text" 
          placeholder="Search by student, assignment, or course..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon="search"
          className="w-full min-w-0 min-h-[44px] box-border"
          wrapperClassName="w-full min-w-0 box-border"
        />
      </div>
      <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto min-w-0 box-border">
        <div className="w-full md:w-48 min-w-0 shrink-0">
          <Select 
            options={courseOptions}
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="w-full min-w-0 box-border"
          />
        </div>
        <div className="w-full md:w-48 min-w-0 shrink-0">
          <Select 
            options={assignmentOptions}
            value={assignmentFilter}
            onChange={(e) => setAssignmentFilter(e.target.value)}
            className="w-full min-w-0 box-border"
          />
        </div>
        <div className="w-full md:w-48 min-w-0 shrink-0">
          <Select 
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full min-w-0 box-border"
          />
        </div>
      </div>
    </div>
  );
}
