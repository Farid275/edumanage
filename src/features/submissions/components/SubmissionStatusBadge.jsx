export function SubmissionStatusBadge({ status, isLate, attemptCount }) {
  let colorClass = 'bg-gray-100 text-gray-700 border-gray-200';
  let label = 'Not Submitted';
  let icon = 'horizontal_rule';

  if (status === 'submitted') {
    colorClass = 'bg-blue-50 text-blue-700 border-blue-200';
    label = 'Submitted';
    icon = 'check_circle';
  } else if (status === 'resubmitted') {
    colorClass = 'bg-indigo-50 text-indigo-700 border-indigo-200';
    label = `Resubmitted (Attempt ${attemptCount})`;
    icon = 'update';
  } else if (status === 'graded') {
    colorClass = 'bg-green-50 text-green-700 border-green-200';
    label = 'Graded';
    icon = 'verified';
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">{icon}</span>
        {label}
      </span>
      {isLate && (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border bg-red-50 text-red-700 border-red-200">
          Late
        </span>
      )}
    </div>
  );
}
