import { useState, useCallback } from 'react';
import { 
  getStudentEnrollments, 
  getAvailableCourses, 
  createEnrollment, 
  updateEnrollment, 
  deleteEnrollment 
} from '../api/enrollmentsApi';
import { useAuth } from '../../auth/context/AuthContext';

export function useStudentEnrollments() {
  const { user, role } = useAuth();
  
  const [enrollments, setEnrollments] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEnrollments = useCallback(async (studentId) => {
    if (!studentId) return;
    setIsLoading(true);
    setError(null);
    try {
      const [enrollData, coursesData] = await Promise.all([
        getStudentEnrollments(studentId),
        role === 'admin' ? getAvailableCourses() : Promise.resolve([])
      ]);
      setEnrollments(enrollData);
      setAvailableCourses(coursesData);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load enrollments');
    } finally {
      setIsLoading(false);
    }
  }, [role]);

  const handleCreate = async (payload) => {
    try {
      const payloadWithAuth = {
        ...payload,
        enrolled_by: user.id
      };
      await createEnrollment(payloadWithAuth);
      await fetchEnrollments(payload.student_id);
      return { error: null };
    } catch (err) {
      if (err.code === '23505') {
        return { error: 'Student is already enrolled in this course.' };
      }
      return { error: err.message || 'Failed to add enrollment' };
    }
  };

  const handleUpdate = async (id, studentId, status) => {
    try {
      await updateEnrollment(id, { status });
      await fetchEnrollments(studentId);
      return { error: null };
    } catch (err) {
      return { error: err.message || 'Failed to update enrollment' };
    }
  };

  const handleDelete = async (id, studentId) => {
    try {
      await deleteEnrollment(id);
      await fetchEnrollments(studentId);
      return { error: null };
    } catch (err) {
      return { error: err.message || 'Failed to delete enrollment' };
    }
  };

  return {
    enrollments,
    availableCourses,
    isLoading,
    error,
    fetchEnrollments,
    handleCreate,
    handleUpdate,
    handleDelete
  };
}
