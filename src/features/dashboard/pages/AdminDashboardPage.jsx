import { PageHeader } from '../../../components/ui/PageHeader';
import { MetricCard } from '../components/MetricCard';
import { DashboardSection } from '../components/DashboardSection';
import { SectionHeader } from '../components/SectionHeader';
import { ChartPlaceholder } from '../components/ChartPlaceholder';
import { ActivityList } from '../components/ActivityList';
import { QuickAction } from '../components/QuickAction';

export function AdminDashboardPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-7xl mx-auto w-full">
      <PageHeader 
        title="Admin Dashboard" 
        description="Institutional overview and academic management."
        action={<span className="text-sm font-medium text-[var(--color-on-surface-variant)]">{currentDate}</span>}
      />

      {/* Metrics Grid */}
      <DashboardSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <MetricCard title="Total Students" value="—" icon="school" />
          <MetricCard title="Total Lecturers" value="—" icon="supervisor_account" />
          <MetricCard title="Total Courses" value="—" icon="menu_book" />
          <MetricCard title="Active Assignments" value="0" icon="assignment" />
        </div>
      </DashboardSection>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Academic Overview */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <DashboardSection className="mb-0">
            <SectionHeader title="Academic Overview" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartPlaceholder label="Attendance Overview" />
              <ChartPlaceholder label="Grade Distribution" />
              <div className="md:col-span-2">
                <ChartPlaceholder label="Course Activity" />
              </div>
            </div>
          </DashboardSection>

          <DashboardSection className="mb-0">
            <SectionHeader title="Recent Activity" />
            <ActivityList />
          </DashboardSection>
        </div>

        {/* Right Column: Quick Actions */}
        <div className="lg:col-span-1">
          <DashboardSection className="mb-0 h-full flex flex-col">
            <SectionHeader title="Quick Actions" />
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 flex-1 content-start">
              <QuickAction icon="person_add" label="Add Student" />
              <QuickAction icon="library_add" label="Add Course" />
              <QuickAction icon="group_add" label="Add Lecturer" />
              <QuickAction icon="analytics" label="View Reports" />
            </div>
          </DashboardSection>
        </div>

      </div>
    </div>
  );
}
