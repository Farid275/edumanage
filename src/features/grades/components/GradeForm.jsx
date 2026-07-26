import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';

export function GradeForm({ submissionData, isSaving, error, onSubmit, onCancel }) {
  const { assignment, grade } = submissionData;
  
  const [formData, setFormData] = useState({
    score: grade?.score ?? '',
    feedback: grade?.feedback ?? '',
    status: grade?.status ?? 'draft'
  });

  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;

    setLocalError('');

    const scoreNum = Number(formData.score);
    if (formData.score === '' || isNaN(scoreNum)) {
      setLocalError('Score is required and must be a number.');
      return;
    }

    if (scoreNum < 0) {
      setLocalError('Score cannot be negative.');
      return;
    }

    if (scoreNum > assignment.max_score) {
      setLocalError(`Score cannot exceed the maximum of ${assignment.max_score}.`);
      return;
    }

    await onSubmit({
      score: scoreNum,
      feedback: formData.feedback.trim(),
      status: formData.status
    });
  };

  const displayError = localError || error;

  return (
    <form onSubmit={handleSubmit} className="w-full min-w-0">
      {displayError && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 w-full min-w-0 box-border">
          <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
          <p>{displayError}</p>
        </div>
      )}

      <div className="space-y-6 w-full min-w-0 box-border">
        <div className="grid grid-cols-2 gap-5 w-full min-w-0 box-border">
          <div className="space-y-1.5 flex flex-col w-full min-w-0 box-border">
            <label htmlFor="score" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
              Score <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="score"
                name="score"
                type="number"
                min="0"
                max={assignment.max_score}
                step="0.01"
                placeholder="0"
                value={formData.score}
                onChange={handleChange}
                disabled={isSaving}
                className="w-full min-w-0 min-h-[44px] rounded-lg box-border"
                wrapperClassName="w-full min-w-0"
              />
              <span className="text-sm font-medium text-[var(--color-on-surface-variant)] whitespace-nowrap">
                / {assignment.max_score}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 flex flex-col w-full min-w-0 box-border">
            <label htmlFor="status" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
              Status <span className="text-red-500">*</span>
            </label>
            <Select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={isSaving}
              className="w-full min-w-0"
            >
              <option value="draft">Draft (Hidden from Student)</option>
              <option value="published">Published (Visible to Student)</option>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5 flex flex-col w-full min-w-0 box-border">
          <label htmlFor="feedback" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Feedback
          </label>
          <textarea
            id="feedback"
            name="feedback"
            className="flex w-full min-w-0 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-3 text-sm text-[var(--color-on-surface)] transition-colors placeholder:text-[var(--color-on-surface-variant)] focus-visible:border-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50 box-border min-h-[120px] resize-y"
            placeholder="Provide constructive feedback..."
            value={formData.feedback}
            onChange={handleChange}
            disabled={isSaving}
            rows={4}
          />
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-[var(--color-divider)] flex items-center justify-end gap-3 w-full min-w-0 box-border">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Grade'}
        </Button>
      </div>
    </form>
  );
}
