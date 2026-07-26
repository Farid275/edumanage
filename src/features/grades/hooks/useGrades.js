import { useState, useCallback } from 'react';
import { 
  getLecturerGradesData, 
  getStudentGradesData, 
  createGrade, 
  updateGrade 
} from '../api/gradesApi';

export function useGrades(role, currentUserId) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters for Lecturer
  const [courseFilter, setCourseFilter] = useState('');
  const [assignmentFilter, setAssignmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // graded, ungraded, draft, published
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = useCallback(async () => {
    if (!currentUserId || !role) return;
    setIsLoading(true);
    setError(null);

    let res;
    if (role === 'lecturer') {
      res = await getLecturerGradesData(currentUserId);
    } else if (role === 'student') {
      res = await getStudentGradesData(currentUserId);
    } else {
      res = { data: [], error: null }; // Admin or other
    }

    if (res.error) {
      setError(res.error);
    } else {
      setData(res.data);
    }
    
    setIsLoading(false);
  }, [role, currentUserId]);

  const handleSaveGrade = async (submissionId, existingGradeId, payload) => {
    let res;
    if (existingGradeId) {
      res = await updateGrade(existingGradeId, payload);
    } else {
      res = await createGrade({ ...payload, submission_id: submissionId, graded_by: currentUserId });
    }

    if (res.error) {
      console.error("[Grades] Save failed:", {
        code: res.errorObj?.code,
        message: res.errorObj?.message,
        details: res.errorObj?.details,
        hint: res.errorObj?.hint,
      });
      return { error: 'Grade could not be saved. Please try again.' };
    }

    await fetchData();
    return res;
  };

  // Filter logic for Lecturer
  const filteredData = data.filter(item => {
    if (role !== 'lecturer') return true;

    if (courseFilter && item.course?.id !== courseFilter) return false;
    if (assignmentFilter && item.assignment?.id !== assignmentFilter) return false;

    if (statusFilter === 'ungraded' && item.grade) return false;
    if (statusFilter === 'graded' && !item.grade) return false;
    if (statusFilter === 'draft' && item.grade?.status !== 'draft') return false;
    if (statusFilter === 'published' && item.grade?.status !== 'published') return false;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchName = item.student?.full_name?.toLowerCase().includes(term);
      const matchNumber = item.student?.student_number?.toLowerCase().includes(term);
      const matchAssignment = item.assignment?.title?.toLowerCase().includes(term);
      const matchCourse = item.course?.course_code?.toLowerCase().includes(term);

      if (!matchName && !matchNumber && !matchAssignment && !matchCourse) return false;
    }

    return true;
  });

  return {
    data: filteredData,
    rawData: data,
    isLoading,
    error,
    courseFilter,
    setCourseFilter,
    assignmentFilter,
    setAssignmentFilter,
    statusFilter,
    setStatusFilter,
    searchTerm,
    setSearchTerm,
    fetchData,
    handleSaveGrade
  };
}
