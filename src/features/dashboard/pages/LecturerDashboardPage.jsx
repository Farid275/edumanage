import { PageHeader } from '../../../components/ui/PageHeader';
import { MetricCard } from '../components/MetricCard';
import { DashboardSection } from '../components/DashboardSection';
import { SectionHeader } from '../components/SectionHeader';
import { ChartPlaceholder } from '../components/ChartPlaceholder';
import { ActivityList } from '../components/ActivityList';
import { QuickAction } from '../components/QuickAction';

export function LecturerDashboardPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-7xl mx-auto w-full">
      <PageHeader 
        title="Lecturer Dashboard" 
        description="Overview of teaching activities and academic responsibilities."
        action={<span className="text-xs font-normal text-[var(--color-outline)]">{currentDate}</span>}
      />

      {/* Metrics Grid */}
      <DashboardSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <MetricCard title="Assigned Courses" value="—" icon="class" />
          <MetricCard title="Active Assignments" value="0" icon="assignment" />
          <MetricCard title="Attendance Sessions" value="—" icon="fact_check" />
          <MetricCard title="Pending Grading" value="0" icon="grading" />
        </div>
      </DashboardSection>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Teaching Overview & Upcoming */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <DashboardSection className="mb-0">
            <SectionHeader title="Teaching Overview" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartPlaceholder 
                label="Student Attendance" 
                message="Data will appear when course records are available."
              />
              <ChartPlaceholder 
                label="Grade Progress" 
                message="Data will appear when course records are available."
              />
            </div>
          </DashboardSection>

          <DashboardSection className="mb-0">
            <SectionHeader title="Upcoming Responsibilities" />
            <ActivityList 
              message="No upcoming academic responsibilities." 
              icon="event_upcoming" 
            />
          </DashboardSection>
        </div>

        {/* Right Column: Quick Actions */}
        <div className="lg:col-span-1">
          <DashboardSection className="mb-0 h-full flex flex-col">
            <SectionHeader title="Quick Actions" />
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 flex-1 content-start">
              <QuickAction icon="note_add" label="Create Assignment" />
              <QuickAction icon="fact_check" label="Record Attendance" />
              <QuickAction icon="grading" label="Manage Grades" />
              <QuickAction icon="upload_file" label="Upload Material" />
            </div>
          </DashboardSection>
        </div>

      </div>
    </div>
  );
}
