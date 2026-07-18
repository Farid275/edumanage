import { MaterialsEmptyState } from './MaterialsEmptyState';
// The MaterialTypeIcon will be used when real data exists to render icons per row.

const columns = [
  { key: 'material', label: 'Material', width: 'min-w-[240px]' },
  { key: 'course', label: 'Course', width: 'min-w-[160px]' },
  { key: 'type', label: 'Type', width: 'w-[120px]' },
  { key: 'uploadDate', label: 'Upload Date', width: 'w-[130px]' },
  { key: 'status', label: 'Status', width: 'w-[100px]' },
  { key: 'createdBy', label: 'Created By', width: 'min-w-[150px]' },
  { key: 'actions', label: '', width: 'w-[60px]' },
];

export function MaterialsTable({ materials = [] }) {
  return (
    <div className="bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-xl ambient-shadow overflow-hidden">
      <div className="overflow-x-auto">
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
          <tbody>
            {materials.length === 0 && (
              <tr>
                <td colSpan={columns.length}>
                  <MaterialsEmptyState />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
