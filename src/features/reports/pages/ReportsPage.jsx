import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { ReportSummary } from '../components/ReportSummary';
import { ReportFilters } from '../components/ReportFilters';
import { ReportTabs } from '../components/ReportTabs';
import { ReportChartCard } from '../components/ReportChartCard';
import { CourseActivityTable } from '../components/CourseActivityTable';
import { ReportExportActions } from '../components/ReportExportActions';

export function ReportsPage() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <PageHeader
          title="Reports"
          description="Review academic performance, attendance, and course activity."
          action={
            <Button className="md:hidden">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">ios_share</span>
              Export Report
            </Button>
          }
        />
        <div className="hidden md:block mt-1">
            <ReportExportActions />
        </div>
      </div>

      <ReportSummary />
      <ReportFilters />
      <ReportTabs />
      
      {/* Overview Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <div>
          <ReportChartCard 
              title="Attendance Overview" 
              description="Overall attendance trends across the selected period."
              emptyMessage="Attendance insights are not available yet."
              emptyIcon="fact_check"
          />
        </div>
        <div>
          <ReportChartCard 
              title="Grade Distribution" 
              description="Distribution of letter grades and scores."
              emptyMessage="Grade insights are not available yet."
              emptyIcon="bar_chart"
          />
        </div>
        <div className="md:col-span-2 xl:col-span-1">
          <ReportChartCard 
              title="Assignment Status" 
              description="Completion rates and assignment statuses."
              emptyMessage="Assignment insights are not available yet."
              emptyIcon="assignment_turned_in"
          />
        </div>
      </div>

      <CourseActivityTable />
      
      <div className="md:hidden mt-8">
        <h4 className="font-label-md text-sm text-[var(--color-on-surface-variant)] mb-3">Export Options</h4>
        <ReportExportActions />
      </div>
    </div>
  );
}
