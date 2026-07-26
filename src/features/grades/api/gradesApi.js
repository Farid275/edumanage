import { supabase } from '../../../lib/supabaseClient';

export async function getLecturerGradesData(lecturerId) {
  if (!lecturerId) return { data: [], error: null };

  // 1. Fetch courses assigned to this lecturer
  const { data: courses, error: coursesError } = await supabase
    .from('courses')
    .select('id, course_code, course_name')
    .eq('lecturer_id', lecturerId);

  if (coursesError) return { data: null, error: coursesError.message };
  if (!courses || courses.length === 0) return { data: [], error: null };

  const courseIds = courses.map(c => c.id);
  const courseMap = new Map(courses.map(c => [c.id, c]));

  // 2. Fetch assignments for these courses
  const { data: assignments, error: assignError } = await supabase
    .from('assignments')
    .select('id, course_id, title, max_score, due_at, allow_late_submission')
    .in('course_id', courseIds);

  if (assignError) return { data: null, error: assignError.message };
  if (!assignments || assignments.length === 0) return { data: [], error: null };

  const assignIds = assignments.map(a => a.id);
  const assignMap = new Map(assignments.map(a => [a.id, a]));

  // 3. Fetch submissions for these assignments
  const { data: submissions, error: subError } = await supabase
    .from('assignment_submissions')
    .select('*')
    .in('assignment_id', assignIds);

  if (subError) return { data: null, error: subError.message };
  if (!submissions || submissions.length === 0) return { data: [], error: null };

  const studentIds = [...new Set(submissions.map(s => s.student_id))];
  const submissionIds = submissions.map(s => s.id);

  // 4. Fetch student profiles
  const { data: profiles, error: profError } = await supabase
    .from('profiles')
    .select('id, full_name')
    .in('id', studentIds);

  if (profError) return { data: null, error: profError.message };
  const profMap = new Map(profiles.map(p => [p.id, p]));

  // Optional: fetch student records for student_number
  const { data: studentsInfo, error: stuError } = await supabase
    .from('students')
    .select('id, student_number')
    .in('id', studentIds);

  const stuMap = new Map((studentsInfo || []).map(s => [s.id, s]));

  // 5. Fetch existing grades
  const { data: grades, error: gradeError } = await supabase
    .from('grades')
    .select('*')
    .in('submission_id', submissionIds);

  if (gradeError) return { data: null, error: gradeError.message };
  const gradeMap = new Map(grades.map(g => [g.submission_id, g]));

  // 6. Combine all data
  const combinedData = submissions.map(sub => {
    const assignment = assignMap.get(sub.assignment_id);
    const course = courseMap.get(assignment.course_id);
    const profile = profMap.get(sub.student_id);
    const studentInfo = stuMap.get(sub.student_id);
    const grade = gradeMap.get(sub.id);

    return {
      submission: sub,
      assignment,
      course,
      student: {
        id: sub.student_id,
        full_name: profile?.full_name || 'Unknown Student',
        student_number: studentInfo?.student_number || '-'
      },
      grade: grade || null
    };
  });

  // Sort by submitted_at desc
  combinedData.sort((a, b) => new Date(b.submission.submitted_at) - new Date(a.submission.submitted_at));

  return { data: combinedData, error: null };
}

export async function getStudentGradesData(studentId) {
  if (!studentId) return { data: [], error: null };

  // 1. Fetch own submissions
  const { data: submissions, error: subError } = await supabase
    .from('assignment_submissions')
    .select('*')
    .eq('student_id', studentId);

  if (subError) return { data: null, error: subError.message };
  if (!submissions || submissions.length === 0) return { data: [], error: null };

  const submissionIds = submissions.map(s => s.id);
  const assignIds = [...new Set(submissions.map(s => s.assignment_id))];

  // 2. Fetch grades for these submissions (RLS will restrict to published only based on our policies)
  const { data: grades, error: gradeError } = await supabase
    .from('grades')
    .select('*')
    .in('submission_id', submissionIds)
    .eq('status', 'published'); // Enforce published requirement

  if (gradeError) return { data: null, error: gradeError.message };
  if (!grades || grades.length === 0) return { data: [], error: null };

  const gradeMap = new Map(grades.map(g => [g.submission_id, g]));

  // 3. Fetch assignments
  const { data: assignments, error: assignError } = await supabase
    .from('assignments')
    .select('id, course_id, title, max_score')
    .in('id', assignIds);

  if (assignError) return { data: null, error: assignError.message };
  const assignMap = new Map(assignments.map(a => [a.id, a]));
  const courseIds = [...new Set(assignments.map(a => a.course_id))];

  // 4. Fetch courses
  const { data: courses, error: coursesError } = await supabase
    .from('courses')
    .select('id, course_code, course_name')
    .in('id', courseIds);

  if (coursesError) return { data: null, error: coursesError.message };
  const courseMap = new Map(courses.map(c => [c.id, c]));

  // 5. Combine data ONLY for submissions that have a published grade
  const combinedData = [];
  
  for (const sub of submissions) {
    const grade = gradeMap.get(sub.id);
    if (!grade) continue; // Skip ungraded or draft

    const assignment = assignMap.get(sub.assignment_id);
    const course = courseMap.get(assignment.course_id);

    combinedData.push({
      submission: sub,
      assignment,
      course,
      grade
    });
  }

  // Sort by graded_at desc
  combinedData.sort((a, b) => new Date(b.grade.graded_at) - new Date(a.grade.graded_at));

  return { data: combinedData, error: null };
}

export async function createGrade(payload) {
  const { data, error } = await supabase
    .from('grades')
    .insert([payload])
    .select()
    .single();

  if (error) return { error: error.message, errorObj: error, data: null };
  return { data, error: null };
}

export async function updateGrade(id, payload) {
  const { data, error } = await supabase
    .from('grades')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) return { error: error.message, errorObj: error, data: null };
  return { data, error: null };
}
