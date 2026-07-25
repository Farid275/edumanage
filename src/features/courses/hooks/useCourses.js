import { useState, useEffect, useMemo, useCallback } from 'react';
import { getCourses, getLecturers, createCourse, updateCourse, deleteCourse } from '../api/coursesApi';
import { useAuth } from '../../auth/context/AuthContext';

export function useCourses() {
  const { user, role } = useAuth();
  
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [coursesData, lecturersData] = await Promise.all([
        getCourses(),
        role === 'admin' ? getLecturers() : Promise.resolve([])
      ]);
      setCourses(coursesData);
      setLecturers(lecturersData);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  }, [role]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const codeMatch = course.course_code.toLowerCase().includes(query);
        const nameMatch = course.course_name.toLowerCase().includes(query);
        const lecturerMatch = course.profiles?.full_name?.toLowerCase().includes(query);
        const semesterMatch = course.semester.toLowerCase().includes(query);
        
        if (!codeMatch && !nameMatch && !lecturerMatch && !semesterMatch) {
          return false;
        }
      }
      
      // Status
      if (statusFilter && course.status !== statusFilter) {
        return false;
      }
      
      // Semester
      if (semesterFilter && course.semester !== semesterFilter) {
        return false;
      }
      
      return true;
    });
  }, [courses, searchQuery, semesterFilter, statusFilter]);

  const handleCreate = async (payload) => {
    // Formatting handles uppercase + trim
    const formattedPayload = {
      ...payload,
      course_code: payload.course_code.trim().toUpperCase(),
      created_by: user.id
    };

    if (role === 'lecturer') {
      formattedPayload.lecturer_id = user.id;
    }

    try {
      await createCourse(formattedPayload);
      await fetchAll();
      return { error: null };
    } catch (err) {
      return { error: err.message || 'Failed to create course' };
    }
  };

  const handleUpdate = async (id, payload) => {
    const formattedPayload = { ...payload };
    if (formattedPayload.course_code) {
      formattedPayload.course_code = formattedPayload.course_code.trim().toUpperCase();
    }
    
    // Safety check - lecturer can only update their own
    if (role === 'lecturer') {
      formattedPayload.lecturer_id = user.id;
    }
    
    try {
      await updateCourse(id, formattedPayload);
      await fetchAll();
      return { error: null };
    } catch (err) {
      return { error: err.message || 'Failed to update course' };
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      await fetchAll();
      return { error: null };
    } catch (err) {
      return { error: err.message || 'Failed to delete course' };
    }
  };

  return {
    courses: filteredCourses,
    allCoursesCount: courses.length,
    lecturers,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    semesterFilter,
    setSemesterFilter,
    statusFilter,
    setStatusFilter,
    handleCreate,
    handleUpdate,
    handleDelete,
    refreshCourses: fetchAll
  };
}
