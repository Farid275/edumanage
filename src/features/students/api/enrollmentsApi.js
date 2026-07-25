import { supabase } from '../../../lib/supabaseClient';

export async function getStudentEnrollments(studentId) {
  const { data, error } = await supabase
    .from('course_enrollments')
    .select(`
      *,
      courses(course_code, course_name)
    `)
    .eq('student_id', studentId)
    .order('enrolled_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getAvailableCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('id, course_code, course_name, status')
    .eq('status', 'active');

  if (error) throw error;
  return data;
}

export async function createEnrollment(payload) {
  const { data, error } = await supabase
    .from('course_enrollments')
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateEnrollment(id, payload) {
  const { data, error } = await supabase
    .from('course_enrollments')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteEnrollment(id) {
  const { error } = await supabase
    .from('course_enrollments')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}
