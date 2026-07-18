import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { AssignmentSummary } from '../components/AssignmentSummary';
import { AssignmentToolbar } from '../components/AssignmentToolbar';
import { AssignmentsTable } from '../components/AssignmentsTable';

export function AssignmentsPage() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <PageHeader
        title="Assignments"
        description="Create and manage academic assignments across courses."
        action={
          <Button>
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">note_add</span>
            Create Assignment
          </Button>
        }
      />

      <AssignmentSummary />
      <AssignmentToolbar />
      <AssignmentsTable assignments={[]} />
    </div>
  );
}
