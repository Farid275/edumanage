import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Select';

export function EnrollmentForm({ studentId, availableCourses, enrollments, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    course_id: '',
    status: 'active'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Filter out courses the student is already enrolled in
  const enrolledCourseIds = new Set(enrollments.map(e => e.course_id));
  const enrollableCourses = availableCourses.filter(c => !enrolledCourseIds.has(c.id));

  const handleSelectChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;
    
    setErrorMsg('');
    if (!formData.course_id) {
      setErrorMsg('Please select a course.');
      return;
    }

    setIsSaving(true);
    const { error } = await onSave({
      student_id: studentId,
      course_id: formData.course_id,
      status: formData.status
    });

    if (error) {
      setErrorMsg(error);
      setIsSaving(false);
    } else {
      setIsSaving(false);
      onCancel(); // Close form on success
    }
  };

  const courseOptions = [
    { value: '', label: 'Select a course' },
    ...enrollableCourses.map(c => ({ value: c.id, label: `${c.course_code} - ${c.course_name}` }))
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'dropped', label: 'Dropped' }
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-[var(--color-surface-container)] rounded-lg p-5 mb-6 border border-[var(--color-outline-variant)]/50 w-full min-w-0 box-border">
      <h4 className="font-title-sm text-sm text-[var(--color-on-surface)] mb-4">Add Course Enrollment</h4>
      
      {errorMsg && (
        <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 text-xs border border-red-200 w-full box-border">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start w-full min-w-0 box-border">
        <div className="sm:col-span-7 w-full min-w-0 box-border">
          <label className="sr-only">Course</label>
          <div className="w-full min-w-0 box-border">
            <Select 
              options={courseOptions} 
              value={formData.course_id}
              onChange={(e) => handleSelectChange('course_id', e.target.value)}
              disabled={isSaving}
              className="w-full min-h-[44px] rounded-lg box-border"
            />
          </div>
        </div>
        <div className="sm:col-span-5 w-full min-w-0 box-border">
          <label className="sr-only">Status</label>
          <div className="w-full min-w-0 box-border">
            <Select 
              options={statusOptions} 
              value={formData.status}
              onChange={(e) => handleSelectChange('status', e.target.value)}
              disabled={isSaving}
              className="w-full min-h-[44px] rounded-lg box-border"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-5 flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-3 w-full min-w-0 box-border border-t border-[var(--color-divider)] pt-5">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isSaving}
          className="w-full sm:w-auto min-w-0"
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          disabled={isSaving || enrollableCourses.length === 0}
          className="w-full sm:w-auto min-w-0"
        >
          {isSaving ? 'Enrolling...' : 'Enroll Student'}
        </Button>
      </div>

      {enrollableCourses.length === 0 && (
        <p className="mt-3 text-xs text-[var(--color-outline)]">
          This student is already enrolled in all available active courses.
        </p>
      )}
    </form>
  );
}
