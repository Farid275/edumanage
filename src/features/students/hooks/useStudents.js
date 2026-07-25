import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  getStudents, 
  getAvailableStudentProfiles, 
  createStudentRecord, 
  updateStudentRecord, 
  deleteStudentRecord 
} from '../api/studentsApi';
import { useAuth } from '../../auth/context/AuthContext';

export function useStudents() {
  const { user, role } = useAuth();
  
  const [students, setStudents] = useState([]);
  const [availableProfiles, setAvailableProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [programFilter, setProgramFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real RLS setup for Lecturer, getStudents() would only return students in their courses.
      const [studentsData, profilesData] = await Promise.all([
        getStudents(),
        role === 'admin' ? getAvailableStudentProfiles() : Promise.resolve([])
      ]);
      setStudents(studentsData);
      setAvailableProfiles(profilesData);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load students');
    } finally {
      setIsLoading(false);
    }
  }, [role]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const numMatch = student.student_number.toLowerCase().includes(query);
        const nameMatch = student.profiles?.full_name?.toLowerCase().includes(query);
        const progMatch = student.program.toLowerCase().includes(query);
        
        if (!numMatch && !nameMatch && !progMatch) {
          return false;
        }
      }
      
      // Status
      if (statusFilter && student.status !== statusFilter) {
        return false;
      }
      
      // Program
      if (programFilter && student.program !== programFilter) {
        return false;
      }
      
      return true;
    });
  }, [students, searchQuery, programFilter, statusFilter]);

  const handleCreate = async (payload) => {
    const formattedPayload = {
      ...payload,
      student_number: payload.student_number.trim().toUpperCase(),
      created_by: user.id
    };

    try {
      await createStudentRecord(formattedPayload);
      await fetchAll();
      return { error: null };
    } catch (err) {
      // Handle unique constraint violations or other errors
      if (err.code === '23505') {
        return { error: 'A student with this student number already exists.' };
      }
      return { error: err.message || 'Failed to create student record' };
    }
  };

  const handleUpdate = async (id, payload) => {
    const formattedPayload = { ...payload };
    if (formattedPayload.student_number) {
      formattedPayload.student_number = formattedPayload.student_number.trim().toUpperCase();
    }
    
    // We do NOT send created_by or profile changes during an update
    delete formattedPayload.created_by;
    delete formattedPayload.id;

    try {
      await updateStudentRecord(id, formattedPayload);
      await fetchAll();
      return { error: null };
    } catch (err) {
      if (err.code === '23505') {
        return { error: 'A student with this student number already exists.' };
      }
      return { error: err.message || 'Failed to update student record' };
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudentRecord(id);
      await fetchAll();
      return { error: null };
    } catch (err) {
      return { error: err.message || 'Failed to delete student record' };
    }
  };

  return {
    students: filteredStudents,
    allStudentsCount: students.length,
    availableProfiles,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    programFilter,
    setProgramFilter,
    statusFilter,
    setStatusFilter,
    handleCreate,
    handleUpdate,
    handleDelete,
    refreshStudents: fetchAll
  };
}
