import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { useAuth } from '../../auth/context/AuthContext';
import { isoToLocalDatetime, localDatetimeToIso, isDateInPast } from '../utils/dateUtils';

export function AssignmentForm({ 
  mode = 'create', 
  assignment = null, 
  assignableCourses = [], 
  isSaving, 
  error: externalError, 
  onSubmit, 
  onCancel 
}) {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    courseId: '',
    title: '',
    description: '',
    instructions: '',
    dueAt: '',
    maxScore: '100',
    submissionType: 'text_or_file',
    allowLateSubmission: false,
    status: 'draft'
  });

  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && assignment) {
      setFormData({
        courseId: assignment.course_id || '',
        title: assignment.title || '',
        description: assignment.description || '',
        instructions: assignment.instructions || '',
        dueAt: isoToLocalDatetime(assignment.due_at) || '',
        maxScore: assignment.max_score?.toString() || '100',
        submissionType: assignment.submission_type || 'text_or_file',
        allowLateSubmission: !!assignment.allow_late_submission,
        status: assignment.status || 'draft'
      });
    } else if (mode === 'create') {
      setFormData({
        courseId: assignableCourses.length === 1 ? assignableCourses[0].id : '',
        title: '',
        description: '',
        instructions: '',
        dueAt: '',
        maxScore: '100',
        submissionType: 'text_or_file',
        allowLateSubmission: false,
        status: 'draft'
      });
    }
  }, [mode, assignment, assignableCourses]);

  const handleChange = (e) => {
    const { id, name, value, type, checked } = e.target;
    const field = name || id;
    setFormData(prev => ({
      ...prev,
      [field]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (field, event) => {
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!formData.courseId) return 'Please select a course.';
    if (!formData.title.trim()) return 'Title is required.';
    
    if (!formData.dueAt) return 'Due date is required.';
    const isoDate = localDatetimeToIso(formData.dueAt);
    if (!isoDate) return 'Invalid due date format.';
    
    // Warn/block past dates on creation
    if (mode === 'create' && isDateInPast(isoDate)) {
      return 'Due date cannot be in the past for a new assignment.';
    }

    const score = Number(formData.maxScore);
    if (isNaN(score) || score <= 0 || score > 1000) {
      return 'Maximum score must be a number between 1 and 1000.';
    }

    const validSubmissionTypes = ['text', 'file', 'text_or_file'];
    if (!validSubmissionTypes.includes(formData.submissionType)) {
      return 'Please select a valid submission type.';
    }

    const validStatuses = ['draft', 'published', 'closed'];
    if (!validStatuses.includes(formData.status)) {
      return 'Please select a valid status.';
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;

    setLocalError('');
    const validationError = validate();
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    const payload = {
      course_id: formData.courseId,
      title: formData.title.trim(),
      description: formData.description.trim(),
      instructions: formData.instructions.trim(),
      due_at: localDatetimeToIso(formData.dueAt),
      max_score: Number(formData.maxScore),
      submission_type: formData.submissionType,
      allow_late_submission: formData.allowLateSubmission,
      status: formData.status,
    };

    if (mode === 'create') {
      payload.created_by = user?.id;
    }

    await onSubmit(payload);
  };

  const errorMsg = localError || externalError;

  return (
    <form onSubmit={handleSubmit} className="w-full min-w-0">
      {errorMsg && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 w-full min-w-0 box-border">
          <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
          <p>{errorMsg}</p>
        </div>
      )}

      <div className="grid w-full min-w-0 grid-cols-1 gap-5 md:grid-cols-2 box-border">
        
        <div className="space-y-1.5 flex flex-col md:col-span-2 w-full min-w-0 box-border">
          <label className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Course <span className="text-red-500">*</span>
          </label>
          {assignableCourses.length === 0 ? (
            <div className="p-3 bg-[var(--color-surface-container)] rounded-md border border-[var(--color-outline-variant)]/50 text-sm text-[var(--color-on-surface-variant)] w-full min-w-0 box-border">
              You do not have an active course available for creating assignments.
            </div>
          ) : (
            <Select
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={(event) => handleSelectChange('courseId', event)}
              disabled={isSaving}
              className="w-full min-w-0"
            >
              <option value="">Select a course</option>
              {assignableCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.course_code} - {course.course_name}
                </option>
              ))}
            </Select>
          )}
        </div>

        <div className="space-y-1.5 md:col-span-2 w-full min-w-0 box-border">
          <label htmlFor="title" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Title <span className="text-red-500">*</span>
          </label>
          <Input 
            id="title"
            name="title"
            placeholder="e.g. Midterm Essay"
            value={formData.title}
            onChange={handleChange}
            disabled={isSaving}
            className="w-full min-w-0 min-h-[44px] rounded-lg box-border"
            wrapperClassName="w-full min-w-0"
          />
        </div>

        <div className="space-y-1.5 w-full min-w-0 box-border">
          <label htmlFor="dueAt" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Due Date & Time <span className="text-red-500">*</span>
          </label>
          <input 
            type="datetime-local"
            id="dueAt"
            name="dueAt"
            value={formData.dueAt}
            onChange={handleChange}
            disabled={isSaving}
            className="flex h-11 w-full min-w-0 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-2 text-sm text-[var(--color-on-surface)] transition-colors placeholder:text-[var(--color-on-surface-variant)] focus-visible:border-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50 box-border"
          />
        </div>

        <div className="space-y-1.5 w-full min-w-0 box-border">
          <label htmlFor="maxScore" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Maximum Score <span className="text-red-500">*</span>
          </label>
          <Input 
            type="number"
            id="maxScore"
            name="maxScore"
            min="1"
            max="1000"
            value={formData.maxScore}
            onChange={handleChange}
            disabled={isSaving}
            className="w-full min-w-0 min-h-[44px] rounded-lg box-border"
            wrapperClassName="w-full min-w-0"
          />
        </div>

        <div className="space-y-1.5 flex flex-col md:col-span-2 w-full min-w-0 box-border">
          <label htmlFor="description" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Short Description
          </label>
          <Input 
            id="description"
            name="description"
            placeholder="Brief summary visible in lists"
            value={formData.description}
            onChange={handleChange}
            disabled={isSaving}
            className="w-full min-w-0 min-h-[44px] rounded-lg box-border"
            wrapperClassName="w-full min-w-0"
          />
        </div>

        <div className="space-y-1.5 flex flex-col md:col-span-2 w-full min-w-0 box-border">
          <label htmlFor="instructions" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Detailed Instructions
          </label>
          <textarea
            id="instructions"
            name="instructions"
            placeholder="Provide full assignment guidelines..."
            value={formData.instructions}
            onChange={handleChange}
            disabled={isSaving}
            rows={4}
            className="flex w-full min-w-0 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-3 text-sm text-[var(--color-on-surface)] transition-colors placeholder:text-[var(--color-on-surface-variant)] focus-visible:border-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50 box-border"
          />
        </div>

        <div className="space-y-1.5 flex flex-col w-full min-w-0 box-border">
          <label className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Submission Type <span className="text-red-500">*</span>
          </label>
          <Select 
            id="submissionType"
            name="submissionType"
            value={formData.submissionType} 
            onChange={(e) => handleSelectChange('submissionType', e)}
            disabled={isSaving}
            className="w-full min-w-0"
          >
            <option value="text_or_file">Text or File</option>
            <option value="text">Text Only</option>
            <option value="file">File Only</option>
          </Select>
        </div>

        <div className="space-y-1.5 flex flex-col w-full min-w-0 box-border">
          <label className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Status <span className="text-red-500">*</span>
          </label>
          <Select 
            id="status"
            name="status"
            value={formData.status} 
            onChange={(e) => handleSelectChange('status', e)}
            disabled={isSaving}
            className="w-full min-w-0"
          >
            <option value="draft">Draft (Hidden from students)</option>
            <option value="published">Published</option>
            <option value="closed">Closed (No new submissions)</option>
          </Select>
        </div>

        <div className="md:col-span-2 pt-2 pb-2 w-full min-w-0 box-border flex items-center gap-3">
          <input
            type="checkbox"
            id="allowLateSubmission"
            name="allowLateSubmission"
            checked={formData.allowLateSubmission}
            onChange={handleChange}
            disabled={isSaving}
            className="h-4 w-4 rounded border-[var(--color-outline-variant)] text-[var(--color-primary)] focus:ring-[var(--color-primary)] bg-[var(--color-surface-container-lowest)]"
          />
          <label htmlFor="allowLateSubmission" className="text-sm text-[var(--color-on-surface)] select-none cursor-pointer">
            Allow late submissions (marked as late)
          </label>
        </div>

      </div>

      <div className="mt-6 flex w-full flex-col-reverse gap-3 border-t border-[var(--color-divider)] pt-5 sm:flex-row sm:justify-end box-border">
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
          disabled={isSaving || (assignableCourses.length === 0)}
        >
          {isSaving ? 'Saving...' : 'Save Assignment'}
        </Button>
      </div>
    </form>
  );
}
