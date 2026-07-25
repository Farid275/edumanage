import { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { useAuth } from '../../auth/context/AuthContext';

export function LecturerForm({ mode = 'create', lecturer = null, availableProfiles = [], isSaving, error: externalError, onSubmit, onCancel }) {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    profileId: '',
    lecturerNumber: '',
    department: '',
    academicTitle: 'Lecturer',
    specialization: '',
    employmentStatus: 'active',
    officeLocation: ''
  });

  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && lecturer) {
      setFormData({
        profileId: lecturer.id,
        lecturerNumber: lecturer.lecturer_number || '',
        department: lecturer.department || '',
        academicTitle: lecturer.academic_title || 'Lecturer',
        specialization: lecturer.specialization || '',
        employmentStatus: lecturer.employment_status || 'active',
        officeLocation: lecturer.office_location || ''
      });
    } else if (mode === 'create') {
      setFormData({
        profileId: '',
        lecturerNumber: '',
        department: '',
        academicTitle: 'Lecturer',
        specialization: '',
        employmentStatus: 'active',
        officeLocation: ''
      });
    }
  }, [mode, lecturer]);

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name || id]: value
    }));
  };

  const handleSelectChange = (field, event) => {
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (mode === 'create' && !formData.profileId) return 'Please select a registered lecturer profile.';
    if (!formData.lecturerNumber.trim()) return 'Lecturer number is required.';
    if (!formData.department.trim()) return 'Department is required.';
    if (!formData.academicTitle.trim()) return 'Academic title is required.';
    
    const validStatuses = ['active', 'inactive', 'on_leave'];
    if (!validStatuses.includes(formData.employmentStatus)) return 'Please select a valid employment status.';
    
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
      lecturer_number: formData.lecturerNumber.trim().toUpperCase(),
      department: formData.department.trim(),
      academic_title: formData.academicTitle.trim(),
      specialization: formData.specialization.trim(),
      employment_status: formData.employmentStatus,
      office_location: formData.officeLocation.trim(),
    };

    if (mode === 'create') {
      payload.created_by = user?.id;
    }

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
              Link to Registered Profile <span className="text-red-500">*</span>
            </label>
            {availableProfiles.length === 0 ? (
              <div className="p-3 bg-[var(--color-surface-container)] rounded-md border border-[var(--color-outline-variant)]/50 text-sm text-[var(--color-on-surface-variant)] w-full min-w-0 box-border">
                No registered lecturer accounts are waiting for academic setup.
              </div>
            ) : (
              <Select
                id="profileId"
                name="profileId"
                value={formData.profileId}
                onChange={(event) => handleSelectChange('profileId', event)}
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
              {lecturer?.full_name || 'Unknown Lecturer'}
            </div>
          </div>
        )}

        <div className="space-y-1.5 w-full min-w-0 box-border">
          <label htmlFor="lecturerNumber" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Lecturer Number <span className="text-red-500">*</span>
          </label>
          <Input 
            id="lecturerNumber"
            name="lecturerNumber"
            placeholder="e.g. LEC-10023"
            value={formData.lecturerNumber}
            onChange={handleChange}
            disabled={isSaving}
            className="w-full min-w-0 min-h-[44px] rounded-lg box-border uppercase"
            wrapperClassName="w-full min-w-0"
          />
        </div>
        
        <div className="space-y-1.5 flex flex-col w-full min-w-0 box-border">
          <label className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Employment Status <span className="text-red-500">*</span>
          </label>
          <Select 
            id="employmentStatus"
            name="employmentStatus"
            value={formData.employmentStatus} 
            onChange={(e) => handleSelectChange('employmentStatus', e)}
            disabled={isSaving}
            className="w-full min-w-0"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on_leave">On Leave</option>
          </Select>
        </div>

        <div className="space-y-1.5 flex flex-col w-full min-w-0 box-border">
          <label htmlFor="department" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Department <span className="text-red-500">*</span>
          </label>
          <Select 
            id="department"
            name="department"
            value={formData.department} 
            onChange={(e) => handleSelectChange('department', e)}
            disabled={isSaving}
            className="w-full min-w-0"
          >
            <option value="">Select Department</option>
            <option value="cs">Computer Science</option>
            <option value="ee">Electrical Engineering</option>
            <option value="ba">Business Administration</option>
            <option value="math">Mathematics</option>
            <option value="physics">Physics</option>
          </Select>
        </div>

        <div className="space-y-1.5 flex flex-col w-full min-w-0 box-border">
          <label htmlFor="academicTitle" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Academic Title <span className="text-red-500">*</span>
          </label>
          <Select 
            id="academicTitle"
            name="academicTitle"
            value={formData.academicTitle} 
            onChange={(e) => handleSelectChange('academicTitle', e)}
            disabled={isSaving}
            className="w-full min-w-0"
          >
            <option value="Lecturer">Lecturer</option>
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="Associate Professor">Associate Professor</option>
            <option value="Professor">Professor</option>
          </Select>
        </div>

        <div className="space-y-1.5 flex flex-col w-full min-w-0 box-border">
          <label htmlFor="specialization" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Specialization
          </label>
          <Input 
            id="specialization"
            name="specialization"
            placeholder="e.g. Artificial Intelligence"
            value={formData.specialization}
            onChange={handleChange}
            disabled={isSaving}
            className="w-full min-w-0 min-h-[44px] rounded-lg box-border"
            wrapperClassName="w-full min-w-0"
          />
        </div>

        <div className="space-y-1.5 flex flex-col w-full min-w-0 box-border">
          <label htmlFor="officeLocation" className="font-label-md text-sm font-medium text-[var(--color-on-surface)]">
            Office Location
          </label>
          <Input 
            id="officeLocation"
            name="officeLocation"
            placeholder="e.g. Building A, Room 301"
            value={formData.officeLocation}
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
