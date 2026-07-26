-- Drop existing insert/update policies on grades to ensure idempotency
DROP POLICY IF EXISTS "Lecturers can grade submissions from their courses" ON public.grades;
DROP POLICY IF EXISTS "Lecturers can update grades for their courses" ON public.grades;

-- INSERT policy
CREATE POLICY "Lecturers can grade submissions from their courses"
ON public.grades
FOR INSERT
TO authenticated
WITH CHECK (
  graded_by = auth.uid() AND
  EXISTS (
    SELECT 1
    FROM public.assignment_submissions submission
    JOIN public.assignments assignment ON assignment.id = submission.assignment_id
    JOIN public.courses course ON course.id = assignment.course_id
    WHERE submission.id = grades.submission_id
      AND course.lecturer_id = auth.uid()
  )
);

-- UPDATE policy
CREATE POLICY "Lecturers can update grades for their courses"
ON public.grades
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.assignment_submissions submission
    JOIN public.assignments assignment ON assignment.id = submission.assignment_id
    JOIN public.courses course ON course.id = assignment.course_id
    WHERE submission.id = grades.submission_id
      AND course.lecturer_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.assignment_submissions submission
    JOIN public.assignments assignment ON assignment.id = submission.assignment_id
    JOIN public.courses course ON course.id = assignment.course_id
    WHERE submission.id = grades.submission_id
      AND course.lecturer_id = auth.uid()
  )
);
