import { useState, useEffect, useMemo } from 'react';
import { 
  getLecturers, 
  getAvailableLecturerProfiles, 
  createLecturerRecord, 
  updateLecturerRecord, 
  deleteLecturerRecord,
  getLecturerAssignedCourses
} from '../api/lecturersApi';

export function useLecturers() {
  const [lecturers, setLecturers] = useState([]);
  const [availableProfiles, setAvailableProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchLecturers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await getLecturers();
      setLecturers(data || []);
    } catch (err) {
      setError('Lecturer data could not be loaded. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAvailableProfiles = async () => {
    const { data, error: fetchError } = await getAvailableLecturerProfiles();
    if (fetchError) {
      console.error('Failed to fetch available profiles:', fetchError);
    } else {
      setAvailableProfiles(data || []);
    }
  };

  useEffect(() => {
    fetchLecturers();
    fetchAvailableProfiles();
  }, []);

  const handleCreate = async (payload) => {
    const { error: createError } = await createLecturerRecord(payload);
    if (createError) {
      return { error: createError };
    }
    await fetchLecturers();
    await fetchAvailableProfiles();
    return { error: null };
  };

  const handleUpdate = async (id, payload) => {
    const { error: updateError } = await updateLecturerRecord(id, payload);
    if (updateError) {
      return { error: updateError };
    }
    await fetchLecturers();
    return { error: null };
  };

  const handleDelete = async (id) => {
    const { error: deleteError } = await deleteLecturerRecord(id);
    if (deleteError) {
      return { error: deleteError };
    }
    await fetchLecturers();
    await fetchAvailableProfiles();
    return { error: null };
  };

  const handleCheckAssignments = async (id) => {
    return await getLecturerAssignedCourses(id);
  };

  const filteredLecturers = useMemo(() => {
    return lecturers.filter(lecturer => {
      const matchesSearch = !searchQuery || 
        lecturer.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lecturer.lecturer_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lecturer.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lecturer.academic_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lecturer.specialization?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDept = !departmentFilter || lecturer.department === departmentFilter;
      const matchesStatus = !statusFilter || lecturer.employment_status === statusFilter;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [lecturers, searchQuery, departmentFilter, statusFilter]);

  return {
    lecturers: filteredLecturers,
    allLecturersCount: lecturers.length,
    availableProfiles,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleCheckAssignments,
    refreshData: fetchLecturers
  };
}
