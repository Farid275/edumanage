import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { AttendanceSummary } from '../components/AttendanceSummary';
import { AttendanceToolbar } from '../components/AttendanceToolbar';
import { AttendanceSessionPanel } from '../components/AttendanceSessionPanel';
import { AttendanceHistory } from '../components/AttendanceHistory';

export function AttendancePage() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <PageHeader
        title="Attendance"
        description="Record and review student attendance across course sessions."
        action={
          <Button>
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">post_add</span>
            Create Attendance Session
          </Button>
        }
      />

      <AttendanceSummary />
      <AttendanceToolbar />
      <AttendanceSessionPanel students={[]} />
      <AttendanceHistory sessions={[]} />
    </div>
  );
}
