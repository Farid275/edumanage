import { useState } from 'react';
import { SubmissionStatusBadge } from './SubmissionStatusBadge';
import { Button } from '../../../components/ui/Button';

export function SubmissionDetails({ submission, publishedGrade, onDownloadFile, downloadError }) {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!submission) return null;

  const handleDownloadClick = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    const url = await onDownloadFile(submission.file_path);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    setIsDownloading(false);
  };

  const submittedDate = new Date(submission.submitted_at).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit'
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between bg-[var(--color-surface-container-lowest)] p-5 rounded-xl border border-[var(--color-outline-variant)]">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-[var(--color-on-surface)]">Submission Status</h4>
          <SubmissionStatusBadge 
            status={submission.status} 
            isLate={submission.is_late} 
            attemptCount={submission.attempt_count} 
          />
        </div>
        <div className="space-y-1 sm:text-right">
          <h4 className="text-sm font-semibold text-[var(--color-on-surface)]">Submitted On</h4>
          <p className="text-sm text-[var(--color-on-surface-variant)]">{submittedDate}</p>
        </div>
      </div>

      {downloadError && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2">
          <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
          <p>{downloadError}</p>
        </div>
      )}

      {submission.text_content && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-[var(--color-on-surface)] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">notes</span>
            Text Response
          </h4>
          <div className="bg-[var(--color-surface)] p-4 rounded-lg border border-[var(--color-outline-variant)] text-sm text-[var(--color-on-surface)] whitespace-pre-wrap">
            {submission.text_content}
          </div>
        </div>
      )}

      {submission.file_path && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-[var(--color-on-surface)] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">attachment</span>
            Attached File
          </h4>
          <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)]">
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="material-symbols-outlined text-[24px] text-[var(--color-primary)]">draft</span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--color-on-surface)] truncate">
                  {submission.file_name}
                </p>
                <p className="text-xs text-[var(--color-on-surface-variant)]">
                  {(submission.file_size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleDownloadClick}
              disabled={isDownloading}
              className="shrink-0"
            >
              {isDownloading ? (
                <span className="material-symbols-outlined text-[18px] animate-spin">hourglass_empty</span>
              ) : (
                <span className="material-symbols-outlined text-[18px]">download</span>
              )}
              Download
            </Button>
          </div>
        </div>
      )}

      {publishedGrade && (
        <div className="mt-8 pt-6 border-t border-[var(--color-divider)]">
          <h3 className="text-lg font-semibold text-[var(--color-on-surface)] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-green-600">verified</span>
            Grading Results
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-xl bg-green-50/50 border border-green-100">
              <p className="text-sm font-medium text-green-800 mb-1">Score</p>
              <p className="text-2xl font-bold text-green-900">
                {publishedGrade.score} <span className="text-lg font-normal text-green-700">/ {publishedGrade.assignment?.max_score || '?'}</span>
              </p>
            </div>
          </div>
          {publishedGrade.feedback && (
            <div className="mt-4 p-4 rounded-xl bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)]">
              <p className="text-sm font-medium text-[var(--color-on-surface)] mb-2">Lecturer Feedback</p>
              <p className="text-sm text-[var(--color-on-surface-variant)] whitespace-pre-wrap">
                {publishedGrade.feedback}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
