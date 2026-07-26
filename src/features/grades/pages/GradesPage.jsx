import { useState, useEffect } from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { useAuth } from '../../auth/context/AuthContext';
import { useGrades } from '../hooks/useGrades';
import { GradesToolbar } from '../components/GradesToolbar';
import { GradesTable } from '../components/GradesTable';
import { GradesEmptyState } from '../components/GradesEmptyState';
import { GradeFormModal } from '../components/GradeFormModal';
import { createSubmissionDownloadUrl } from '../../submissions/api/submissionsApi';
import { LoadingState } from '../../../components/feedback/LoadingState';
import { ErrorState } from '../../../components/feedback/ErrorState';

export function GradesPage() {
  const { role, user } = useAuth();
  
  const {
    data,
    rawData,
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
  } = useGrades(role, user?.id);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSubmissionData, setSelectedSubmissionData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [gradeError, setGradeError] = useState('');

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Derived state for the Toolbar dropdowns
  const uniqueCoursesMap = new Map();
  const uniqueAssignmentsMap = new Map();
  
  if (role === 'lecturer') {
    rawData.forEach(item => {
      if (item.course) {
        uniqueCoursesMap.set(item.course.id, item.course);
      }
      if (item.assignment) {
        uniqueAssignmentsMap.set(item.assignment.id, item.assignment);
      }
    });
  }

  const uniqueCourses = Array.from(uniqueCoursesMap.values());
  const uniqueAssignments = Array.from(uniqueAssignmentsMap.values());

  const handleGradeClick = (row) => {
    setSelectedSubmissionData(row);
    setGradeError('');
    setIsFormOpen(true);
  };

  const handleDownloadFile = async (filePath) => {
    const { data: url, error } = await createSubmissionDownloadUrl(filePath);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.error('Download error:', error);
      alert('Failed to generate download link. Please try again.');
    }
  };

  const onSaveForm = async (payload) => {
    setIsSaving(true);
    setGradeError('');
    
    const existingGradeId = selectedSubmissionData.grade?.id;
    const submissionId = selectedSubmissionData.submission.id;
    
    const res = await handleSaveGrade(submissionId, existingGradeId, payload);
    
    setIsSaving(false);
    
    if (res.error) {
      setGradeError(res.error);
    } else {
      setIsFormOpen(false);
      setSelectedSubmissionData(null);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto w-full pt-10">
        <LoadingState message="Loading grades data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto w-full pt-10">
        <ErrorState message={error} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full min-w-0 box-border">
      <PageHeader
        title={role === 'lecturer' ? "Grade Submissions" : "My Grades"}
        description={role === 'lecturer' ? "Review student work and publish grades." : "View your published grades for submitted assignments."}
      />

      <GradesToolbar 
        role={role}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        courseFilter={courseFilter}
        setCourseFilter={setCourseFilter}
        assignmentFilter={assignmentFilter}
        setAssignmentFilter={setAssignmentFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        uniqueCourses={uniqueCourses}
        uniqueAssignments={uniqueAssignments}
      />

      {data.length > 0 ? (
        <GradesTable 
          role={role}
          data={data}
          onGradeClick={handleGradeClick}
          onDownloadFile={handleDownloadFile}
        />
      ) : (
        <GradesEmptyState 
          role={role}
          searchTerm={searchTerm}
          courseFilter={courseFilter}
          assignmentFilter={assignmentFilter}
        />
      )}

      <GradeFormModal 
        isOpen={isFormOpen}
        submissionData={selectedSubmissionData}
        isSaving={isSaving}
        error={gradeError}
        onSubmit={onSaveForm}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
}
