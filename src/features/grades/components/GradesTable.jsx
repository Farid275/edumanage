import { GradesEmptyState } from './GradesEmptyState';

const columns = [
  { key: 'student', label: 'Student', width: 'min-w-[200px]' },
  { key: 'studentNumber', label: 'Student Number', width: 'w-[140px]' },
  { key: 'score', label: 'Score', width: 'w-[100px] text-right' },
  { key: 'letterGrade', label: 'Letter Grade', width: 'w-[110px] text-center' },
  { key: 'feedback', label: 'Feedback', width: 'min-w-[180px]' },
  { key: 'status', label: 'Status', width: 'w-[100px]' },
  { key: 'actions', label: '', width: 'w-[60px]' },
];

export function GradesTable({ grades = [] }) {
  return (
    <div className="overflow-x-auto">
      {grades.length === 0 ? (
        <GradesEmptyState />
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[var(--color-outline-variant)]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`font-label-md text-xs font-semibold text-[var(--color-on-surface-variant)] uppercase tracking-wider px-5 py-3 ${col.width}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody />
        </table>
      )}
    </div>
  );
}
