import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { GradeSummary } from '../components/GradeSummary';
import { GradeToolbar } from '../components/GradeToolbar';
import { GradeContextPanel } from '../components/GradeContextPanel';
import { GradeDistribution } from '../components/GradeDistribution';

export function GradesPage() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <PageHeader
        title="Grades"
        description="Record and review student academic performance."
        action={
          <Button>
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">add_task</span>
            Add Grade
          </Button>
        }
      />

      <GradeSummary />
      <GradeToolbar />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
            <GradeContextPanel grades={[]} />
        </div>
        <div className="xl:col-span-1">
            <GradeDistribution />
        </div>
      </div>
    </div>
  );
}
