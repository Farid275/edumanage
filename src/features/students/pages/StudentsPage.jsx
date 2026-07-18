import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { StudentSummary } from '../components/StudentSummary';
import { StudentToolbar } from '../components/StudentToolbar';
import { StudentsTable } from '../components/StudentsTable';

export function StudentsPage() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <PageHeader 
        title="Students" 
        description="Manage student records and course enrollment."
        action={
          <Button>
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">person_add</span>
            Add Student
          </Button>
        }
      />

      <StudentSummary />
      <StudentToolbar />
      <StudentsTable students={[]} />
    </div>
  );
}
