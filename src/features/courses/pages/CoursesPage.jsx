import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { CourseSummary } from '../components/CourseSummary';
import { CourseToolbar } from '../components/CourseToolbar';
import { CoursesTable } from '../components/CoursesTable';

export function CoursesPage() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <PageHeader 
        title="Courses" 
        description="Manage academic courses and teaching assignments."
        action={
          <Button>
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Course
          </Button>
        }
      />

      <CourseSummary />
      <CourseToolbar />
      <CoursesTable courses={[]} />
    </div>
  );
}
