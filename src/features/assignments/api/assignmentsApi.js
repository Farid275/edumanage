import { supabase } from '../../../lib/supabaseClient';

export async function getAssignments() {
  const { data, error } = await supabase
    .from('assignments')
    .select(`
      id,
      course_id,
      title,
      description,
      instructions,
      due_at,
      max_score,
      submission_type,
      allow_late_submission,
      status,
      created_by,
      created_at,
      updated_at,
      course:courses!assignments_course_id_fkey (
        id,
        course_code,
        course_name,
        lecturer_id,
        semester,
        status
      )
    `)
    .order('due_at', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Assignments] Error fetching assignments:', error);
    throw error;
  }

  // Normalize assignment payload to single flat shape
  const normalizedData = (data || []).map(assignment => ({
    ...assignment,
    course_code: assignment.course?.course_code || 'Unknown',
    course_name: assignment.course?.course_name || 'Unknown Course',
  }));

  return { data: normalizedData, error: null };
}

export async function getAssignableCourses(lecturerId) {
  if (!lecturerId) return { data: [], error: null };

  const { data, error } = await supabase
    .from('courses')
    .select(`
      id,
      course_code,
      course_name,
      lecturer_id,
      semester,
      status
    `)
    .eq('lecturer_id', lecturerId)
    .eq('status', 'active')
    .order('course_code', { ascending: true });

  if (error) {
    console.error('[Assignments] Error fetching assignable courses:', error);
    throw error;
  }

  return { data, error: null };
}

export async function createAssignment(payload) {
  const { data, error } = await supabase
    .from('assignments')
    .insert([payload])
    .select()
    .single();

  if (error) {
    return { error: error.message, data: null };
  }
  return { data, error: null };
}

export async function updateAssignment(id, payload) {
  const { data, error } = await supabase
    .from('assignments')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { error: error.message, data: null };
  }
  return { data, error: null };
}

export async function deleteAssignment(id) {
  const { error } = await supabase
    .from('assignments')
    .delete()
    .eq('id', id);

  if (error) {
    return { error: error.message, data: null };
  }
  return { data: true, error: null };
}
