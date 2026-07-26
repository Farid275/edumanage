-- Fix Lecturer Grades query failure by allowing lecturers to view submissions for their courses.
-- The existing queries successfully attempt to fetch submissions using `in('assignment_id', assignIds)`, 
-- but were blocked by restrictive Row Level Security (RLS) on the assignment_submissions table.

CREATE POLICY "Lecturers can view submissions for their courses"
ON public.assignment_submissions
FOR SELECT
TO authenticated
USING (
  assignment_id IN (
    SELECT a.id FROM public.assignments a
    JOIN public.courses c ON c.id = a.course_id
    WHERE c.lecturer_id = auth.uid()
  )
);
