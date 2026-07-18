import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { LecturerSummary } from '../components/LecturerSummary';
import { LecturerToolbar } from '../components/LecturerToolbar';
import { LecturersTable } from '../components/LecturersTable';

export function LecturersPage() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <PageHeader
        title="Lecturers"
        description="Manage lecturer profiles and teaching assignments."
        action={
          <Button>
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">person_add</span>
            Add Lecturer
          </Button>
        }
      />

      <LecturerSummary />
      <LecturerToolbar />
      <LecturersTable lecturers={[]} />
    </div>
  );
}
