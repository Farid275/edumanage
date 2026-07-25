import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { useAuth } from '../../auth/context/AuthContext';

export function CourseForm({ course = null, lecturers = [], onClose, onSave }) {
  const { role, user } = useAuth();
  
  const [formData, setFormData] = useState({
    course_code: '',
    course_name: '',
    description: '',
    credits: 3,
    semester: '',
    status: 'active',
    lecturer_id: ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (course) {
      setFormData({
        course_code: course.course_code || '',
        course_name: course.course_name || '',
        description: course.description || '',
        credits: course.credits || 3,
        semester: course.semester || '',
        status: course.status || 'active',
        lecturer_id: course.lecturer_id || ''
      });
    } else if (role === 'lecturer') {
      // For lecturers, default their own ID
      setFormData(prev => ({ ...prev, lecturer_id: user.id }));
    }
  }, [course, role, user.id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'credits' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const handleSelectChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    if (!formData.course_code.trim()) return 'Course code is required.';
    if (!formData.course_name.trim()) return 'Course name is required.';
    if (!formData.semester.trim()) return 'Semester is required.';
    if (formData.credits < 1 || formData.credits > 12) return 'Credits must be between 1 and 12.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;

    setErrorMsg('');
    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setIsSaving(true);
    const { error } = await onSave(formData);
    
    if (error) {
      setErrorMsg(error);
      setIsSaving(false);
    } else {
      setIsSaving(false);
      onClose();
    }
  };

  const isEditing = !!course;
  const isLecturer = role === 'lecturer';

  const semesterOptions = [
    { value: '', label: 'Select Semester' },
    { value: 'fall-2025', label: 'Fall 2025' },
    { value: 'spring-2025', label: 'Spring 2025' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'archived', label: 'Archived' }
  ];

  const lecturerOptions = [
    { value: '', label: 'Unassigned' },
    ...lecturers.map(l => ({ value: l.id, label: l.full_name }))
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-[var(--color-surface-container-lowest)] rounded-xl ambient-shadow w-full max-w-lg max-h-[90vh] overflow-y-auto overflow-x-hidden animate-fade-in-up">
        <div className="p-6 border-b border-[var(--color-outline-variant)] flex items-center justify-between sticky top-0 bg-[var(--color-surface-container-lowest)] z-10">
          <h2 className="font-title-lg text-[var(--color-on-surface)]">
            {isEditing ? 'Edit Course' : 'Create Course'}
          </h2>
          <button 
            type="button"
            onClick={onClose}
            className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] transition-colors p-2"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
              <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
              <p>{errorMsg}</p>
            </div>
          )}

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="course_code" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
                  Course Code <span className="text-red-500">*</span>
                </label>
                <Input 
                  id="course_code"
                  placeholder="CS101"
                  value={formData.course_code}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="credits" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
                  Credits <span className="text-red-500">*</span>
                </label>
                <Input 
                  id="credits"
                  type="number"
                  min="1"
                  max="12"
                  value={formData.credits}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="course_name" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
                Course Name <span className="text-red-500">*</span>
              </label>
              <Input 
                id="course_name"
                placeholder="Introduction to Computer Science"
                value={formData.course_name}
                onChange={handleChange}
                disabled={isSaving}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="description" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
                Description
              </label>
              <textarea
                id="description"
                className="w-full rounded-lg border border-[var(--color-outline-variant)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-on-surface)] placeholder:text-[var(--color-on-surface-variant)]/60 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all resize-y min-h-[100px]"
                placeholder="Brief course description..."
                value={formData.description}
                onChange={handleChange}
                disabled={isSaving}
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1.5 flex flex-col">
                <label className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
                  Semester <span className="text-red-500">*</span>
                </label>
                <Select 
                  options={semesterOptions} 
                  value={formData.semester} 
                  onChange={(val) => handleSelectChange('semester', val)}
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-1.5 flex flex-col">
                <label className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
                  Status <span className="text-red-500">*</span>
                </label>
                <Select 
                  options={statusOptions} 
                  value={formData.status} 
                  onChange={(val) => handleSelectChange('status', val)}
                  disabled={isSaving}
                />
              </div>
            </div>

            {!isLecturer && (
              <div className="space-y-1.5 flex flex-col">
                <label className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
                  Assigned Lecturer
                </label>
                <Select 
                  options={lecturerOptions} 
                  value={formData.lecturer_id} 
                  onChange={(val) => handleSelectChange('lecturer_id', val)}
                  disabled={isSaving}
                />
              </div>
            )}
          </div>

          <div className="mt-8 pt-5 border-t border-[var(--color-outline-variant)] flex items-center justify-end gap-3 sticky bottom-0 bg-[var(--color-surface-container-lowest)] z-10">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
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
      </div>
    </div>
  );
}
