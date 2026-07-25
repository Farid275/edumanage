import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';

export function StudentForm({ mode = 'create', student = null, availableProfiles = [], isSaving, error: externalError, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    profileId: '',
    studentNumber: '',
    program: '',
    enrollmentYear: new Date().getFullYear().toString(),
    status: 'active',
  });

  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && student) {
      setFormData({
        profileId: student.id,
        studentNumber: student.student_number || '',
        program: student.program || '',
        enrollmentYear: student.enrollment_year?.toString() || new Date().getFullYear().toString(),
        status: student.status || 'active',
      });
    } else if (mode === 'create') {
      setFormData({
        profileId: '',
        studentNumber: '',
        program: '',
        enrollmentYear: new Date().getFullYear().toString(),
        status: 'active',
      });
    }
  }, [mode, student]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (field, event) => {
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (mode === 'create' && !formData.profileId) return 'Please select a registered student account.';
    if (!formData.studentNumber.trim()) return 'Student number is required.';
    if (!formData.program.trim()) return 'Program is required.';
    
    const year = Number(formData.enrollmentYear);
    if (!year || year < 1900 || year > 2100) return 'Please provide a valid enrollment year.';
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
      id: formData.profileId,
      student_number: formData.studentNumber,
      program: formData.program,
      enrollment_year: Number(formData.enrollmentYear),
      status: formData.status
    };

    await onSubmit(payload);
  };

  const isEditing = mode === 'edit';
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
        {!isEditing ? (
          <div className="space-y-1.5 flex flex-col md:col-span-2 w-full min-w-0 box-border">
            <label className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
              Link to Registered Account <span className="text-red-500">*</span>
            </label>
            {availableProfiles.length === 0 ? (
              <div className="p-3 bg-[var(--color-surface-container)] rounded-md border border-[var(--color-outline-variant)]/50 text-sm text-[var(--color-on-surface-variant)] w-full min-w-0 box-border">
                No registered student accounts are waiting for academic setup.
              </div>
            ) : (
              <Select
                id="profileId"
                name="profileId"
                value={formData.profileId}
                onChange={(event) => {
                  const selectedProfileId = event.target.value;
                  setFormData((current) => ({
                    ...current,
                    profileId: selectedProfileId,
                  }));
                }}
                disabled={isEditing || isSaving}
                className="w-full min-w-0"
              >
                <option value="">Select a registered account</option>
                {availableProfiles.map((profile) => (
                  <option key={profile.id} value={profile.id}>
                    {profile.full_name}
                  </option>
                ))}
              </Select>
            )}
          </div>
        ) : (
          <div className="space-y-1.5 md:col-span-2 w-full min-w-0 box-border">
            <label className="font-label-md text-sm font-medium text-[var(--color-on-surface-variant)]">
              Linked Account
            </label>
            <div className="p-3 bg-[var(--color-surface-container)] rounded-md border border-[var(--color-outline-variant)]/50 text-sm font-medium text-[var(--color-on-surface)] w-full min-w-0 box-border">
              {student?.profiles?.full_name || 'Unknown Student'}
            </div>
          </div>
        )}

        <div className="space-y-1.5 w-full min-w-0 box-border">
          <label htmlFor="studentNumber" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Student Number <span className="text-red-500">*</span>
          </label>
          <Input 
            id="studentNumber"
            name="studentNumber"
            placeholder="e.g. STU-10023"
            value={formData.studentNumber}
            onChange={handleChange}
            disabled={isSaving}
            className="w-full min-w-0 min-h-[44px] rounded-lg box-border"
            wrapperClassName="w-full min-w-0"
          />
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
            <option value="graduated">Graduated</option>
          </Select>
        </div>

        <div className="space-y-1.5 flex flex-col md:col-span-2 w-full min-w-0 box-border">
          <label className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Program <span className="text-red-500">*</span>
          </label>
          <Select 
            id="program"
            name="program"
            value={formData.program} 
            onChange={(e) => handleSelectChange('program', e)}
            disabled={isSaving}
            className="w-full min-w-0"
          >
            <option value="">Select Program</option>
            <option value="cs">Computer Science</option>
            <option value="ee">Electrical Engineering</option>
            <option value="ba">Business Administration</option>
          </Select>
        </div>

        <div className="space-y-1.5 flex flex-col md:col-span-2 w-full min-w-0 box-border">
          <label htmlFor="enrollmentYear" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Enrollment Year <span className="text-red-500">*</span>
          </label>
          <Input 
            id="enrollmentYear"
            name="enrollmentYear"
            type="number"
            value={formData.enrollmentYear}
            onChange={handleChange}
            disabled={isSaving}
            className="w-full min-w-0 min-h-[44px] rounded-lg box-border"
            wrapperClassName="w-full min-w-0"
          />
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
          disabled={isSaving || (mode === 'create' && availableProfiles.length === 0)}
        >
          {isSaving ? 'Saving...' : 'Save Record'}
        </Button>
      </div>
    </form>
  );
}
