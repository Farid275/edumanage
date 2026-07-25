import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';

export function CourseForm({ mode = 'create', course = null, lecturers = [], currentRole, currentUserId, isSaving, error: externalError, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    courseCode: '',
    courseName: '',
    description: '',
    credits: '3',
    semester: '',
    status: 'active',
    lecturerId: ''
  });

  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && course) {
      setFormData({
        courseCode: course.course_code || '',
        courseName: course.course_name || '',
        description: course.description || '',
        credits: course.credits?.toString() || '3',
        semester: course.semester || '',
        status: course.status || 'active',
        lecturerId: course.lecturer_id || ''
      });
    } else if (mode === 'create') {
      setFormData({
        courseCode: '',
        courseName: '',
        description: '',
        credits: '3',
        semester: '',
        status: 'active',
        lecturerId: currentRole === 'lecturer' ? currentUserId : ''
      });
    }
  }, [mode, course, currentRole, currentUserId]);

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name || id]: value
    }));
  };

  const handleSelectChange = (e) => {
    const { id, name, value } = e.target;
    setFormData(prev => ({ ...prev, [name || id]: value }));
  };

  const validate = () => {
    if (!formData.courseCode.trim()) return 'Course code is required.';
    if (!formData.courseName.trim()) return 'Course name is required.';
    if (!formData.semester.trim()) return 'Semester is required.';
    const creditsNum = Number(formData.credits);
    if (isNaN(creditsNum) || creditsNum < 1 || creditsNum > 12) return 'Credits must be between 1 and 12.';
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
      course_code: formData.courseCode.trim().toUpperCase(),
      course_name: formData.courseName.trim(),
      description: formData.description.trim(),
      credits: Number(formData.credits),
      semester: formData.semester.trim(),
      status: formData.status,
      lecturer_id: currentRole === 'lecturer' ? currentUserId : (formData.lecturerId || null),
    };

    if (mode === 'create') {
      payload.created_by = currentUserId;
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
        <div className="space-y-1.5 w-full min-w-0 box-border">
          <label htmlFor="courseCode" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Course Code <span className="text-red-500">*</span>
          </label>
          <Input 
            id="courseCode"
            name="courseCode"
            placeholder="CS101"
            value={formData.courseCode}
            onChange={handleChange}
            disabled={isSaving}
            className="w-full min-w-0 min-h-[44px] rounded-lg box-border uppercase"
            wrapperClassName="w-full min-w-0"
          />
        </div>

        <div className="space-y-1.5 w-full min-w-0 box-border">
          <label htmlFor="credits" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Credits <span className="text-red-500">*</span>
          </label>
          <Input 
            id="credits"
            name="credits"
            type="number"
            min="1"
            max="12"
            value={formData.credits}
            onChange={handleChange}
            disabled={isSaving}
            className="w-full min-w-0 min-h-[44px] rounded-lg box-border"
            wrapperClassName="w-full min-w-0"
          />
        </div>

        <div className="space-y-1.5 md:col-span-2 w-full min-w-0 box-border">
          <label htmlFor="courseName" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Course Name <span className="text-red-500">*</span>
          </label>
          <Input 
            id="courseName"
            name="courseName"
            placeholder="Introduction to Computer Science"
            value={formData.courseName}
            onChange={handleChange}
            disabled={isSaving}
            className="w-full min-w-0 min-h-[44px] rounded-lg box-border"
            wrapperClassName="w-full min-w-0"
          />
        </div>

        <div className="space-y-1.5 flex flex-col md:col-span-2 w-full min-w-0 box-border">
          <label htmlFor="description" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="flex w-full min-w-0 rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-3 text-sm text-[var(--color-on-surface)] transition-colors placeholder:text-[var(--color-on-surface-variant)] focus-visible:border-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50 box-border min-h-[100px] resize-y"
            placeholder="Brief course description..."
            value={formData.description}
            onChange={handleChange}
            disabled={isSaving}
            rows={4}
          />
        </div>

        <div className="space-y-1.5 flex flex-col w-full min-w-0 box-border">
          <label className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Semester <span className="text-red-500">*</span>
          </label>
          <Select 
            id="semester"
            name="semester"
            value={formData.semester} 
            onChange={handleSelectChange}
            disabled={isSaving}
            className="w-full min-w-0"
          >
            <option value="">Select Semester</option>
            <option value="fall-2025">Fall 2025</option>
            <option value="spring-2025">Spring 2025</option>
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
            onChange={handleSelectChange}
            disabled={isSaving}
            className="w-full min-w-0"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="archived">Archived</option>
          </Select>
        </div>

        {currentRole !== 'lecturer' && (
          <div className="space-y-1.5 flex flex-col md:col-span-2 w-full min-w-0 box-border">
            <label className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
              Assigned Lecturer
            </label>
            <Select 
              id="lecturerId"
              name="lecturerId"
              value={formData.lecturerId} 
              onChange={handleSelectChange}
              disabled={isSaving}
              className="w-full min-w-0"
            >
              <option value="">Unassigned</option>
              {lecturers.map(l => (
                <option key={l.id} value={l.id}>{l.full_name}</option>
              ))}
            </Select>
          </div>
        )}
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
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Course'}
        </Button>
      </div>
    </form>
  );
}
