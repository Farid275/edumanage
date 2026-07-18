import { Button } from '../../../components/ui/Button';
import { GradesTable } from './GradesTable';

export function GradeContextPanel({ grades = [] }) {
  const hasContext = false;

  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow overflow-hidden mb-8">
      {/* Context info header */}
      <div className="px-5 py-4 border-b border-[var(--color-outline-variant)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="font-headline-sm text-base font-semibold text-[var(--color-on-surface)]">Assignment Grades</h3>
          <p className="font-body-sm text-xs text-[var(--color-on-surface-variant)] mt-0.5">Manage and publish student scores.</p>
        </div>
        
        {hasContext && (
          <div className="flex flex-wrap items-center gap-2 lg:flex-shrink-0">
             <Button variant="ghost" className="text-xs h-8 px-3">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">cleaning_services</span>
              Clear Changes
            </Button>
            <Button variant="secondary" className="text-xs h-8 px-4">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">save</span>
              Save Draft
            </Button>
            <Button className="text-xs h-8 px-4">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">publish</span>
              Publish Grades
            </Button>
          </div>
        )}
      </div>

      {/* Table Area */}
      <GradesTable grades={grades} />
    </div>
  );
}
