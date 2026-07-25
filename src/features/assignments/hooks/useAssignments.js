import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import {
  getAssignments,
  getAssignableCourses,
  createAssignment,
  updateAssignment,
  deleteAssignment
} from '../api/assignmentsApi';

export function useAssignments() {
  const { user, role } = useAuth();
  
  const [assignments, setAssignments] = useState([]);
  const [assignableCourses, setAssignableCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchAssignmentsData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await getAssignments();
      setAssignments(data || []);
    } catch (err) {
      setError('Assignments could not be loaded. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourses = async () => {
    if (role === 'lecturer' && user?.id) {
      try {
        const { data } = await getAssignableCourses(user.id);
        setAssignableCourses(data || []);
      } catch (err) {
        console.error('Failed to load assignable courses', err);
      }
    }
  };

  useEffect(() => {
    fetchAssignmentsData();
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, role]);

  const handleCreate = async (payload) => {
    const { error: createError } = await createAssignment(payload);
    if (createError) {
      return { error: createError };
    }
    await fetchAssignmentsData();
    return { error: null };
  };

  const handleUpdate = async (id, payload) => {
    const { error: updateError } = await updateAssignment(id, payload);
    if (updateError) {
      return { error: updateError };
    }
    await fetchAssignmentsData();
    return { error: null };
  };

  const handleDelete = async (id) => {
    const { error: deleteError } = await deleteAssignment(id);
    if (deleteError) {
      return { error: deleteError };
    }
    await fetchAssignmentsData();
    return { error: null };
  };

  const filteredAssignments = useMemo(() => {
    return assignments.filter(assignment => {
      // Role filtering rule: Students cannot see drafts
      if (role === 'student' && assignment.status === 'draft') return false;

      const matchesSearch = !searchQuery || 
        assignment.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.course_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.course_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCourse = !courseFilter || assignment.course_id === courseFilter;
      const matchesStatus = !statusFilter || assignment.status === statusFilter;

      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [assignments, searchQuery, courseFilter, statusFilter, role]);

  return {
    assignments: filteredAssignments,
    assignableCourses,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    courseFilter,
    setCourseFilter,
    statusFilter,
    setStatusFilter,
    handleCreate,
    handleUpdate,
    handleDelete,
    refreshData: fetchAssignmentsData
  };
}
