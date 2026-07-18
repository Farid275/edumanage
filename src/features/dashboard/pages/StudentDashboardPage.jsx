import { PageHeader } from '../../../components/ui/PageHeader';
import { MetricCard } from '../components/MetricCard';
import { DashboardSection } from '../components/DashboardSection';
import { SectionHeader } from '../components/SectionHeader';
import { ChartPlaceholder } from '../components/ChartPlaceholder';
import { ActivityList } from '../components/ActivityList';
import { QuickAction } from '../components/QuickAction';

export function StudentDashboardPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-7xl mx-auto w-full">
      <PageHeader 
        title="Student Dashboard" 
        description="Overview of your courses and academic progress."
        action={<span className="text-xs font-normal text-[var(--color-outline)]">{currentDate}</span>}
      />

      {/* Metrics Grid */}
      <DashboardSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <MetricCard title="Enrolled Courses" value="—" icon="class" />
          <MetricCard title="Pending Assignments" value="0" icon="assignment_late" />
          <MetricCard title="Attendance Rate" value="—" icon="co_present" />
          <MetricCard title="Current GPA" value="—" icon="school" />
        </div>
      </DashboardSection>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Academic Progress, Upcoming Work, Materials */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <DashboardSection className="mb-0">
            <SectionHeader title="Academic Progress" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartPlaceholder 
                label="Attendance Progress" 
                message="Data will appear when academic records are available."
              />
              <ChartPlaceholder 
                label="Grade Progress" 
                message="Data will appear when academic records are available."
              />
            </div>
          </DashboardSection>

          <DashboardSection className="mb-0">
            <SectionHeader title="Upcoming Academic Work" />
            <ActivityList 
              message="No upcoming assignments." 
              icon="assignment" 
            />
          </DashboardSection>

          <DashboardSection className="mb-0">
            <SectionHeader title="Recent Learning Materials" />
            <ActivityList 
              message="No learning materials are available yet." 
              icon="library_books" 
            />
          </DashboardSection>
        </div>

        {/* Right Column: Quick Actions */}
        <div className="lg:col-span-1">
          <DashboardSection className="mb-0 h-full flex flex-col">
            <SectionHeader title="Quick Actions" />
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 flex-1 content-start">
              <QuickAction icon="menu_book" label="View Courses" />
              <QuickAction icon="assignment" label="View Assignments" />
              <QuickAction icon="co_present" label="View Attendance" />
              <QuickAction icon="grade" label="View Grades" />
            </div>
          </DashboardSection>
        </div>

      </div>
    </div>
  );
}
