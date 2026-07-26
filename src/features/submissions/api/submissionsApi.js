import { supabase } from '../../../lib/supabaseClient';

const BUCKET_NAME = 'assignment-submissions';

export async function getOwnSubmission(assignmentId, studentId) {
  const { data, error } = await supabase
    .from('assignment_submissions')
    .select('*')
    .eq('assignment_id', assignmentId)
    .eq('student_id', studentId)
    .maybeSingle();

  if (error) {
    console.error('[Submissions] Error fetching own submission:', error);
    return { data: null, error: error.message };
  }
  return { data, error: null };
}

export async function getStudentSubmissions(assignmentIds, studentId) {
  if (!assignmentIds || assignmentIds.length === 0) {
    return { data: [], error: null };
  }

  const { data, error } = await supabase
    .from('assignment_submissions')
    .select(`
      id,
      assignment_id,
      student_id,
      text_content,
      file_path,
      file_name,
      file_size,
      mime_type,
      status,
      is_late,
      attempt_count,
      submitted_at,
      created_at,
      updated_at
    `)
    .in('assignment_id', assignmentIds)
    .eq('student_id', studentId);

  if (error) {
    console.error('[Submissions] Error fetching student submissions:', error);
    return { data: null, error: error.message };
  }
  return { data: data || [], error: null };
}

export async function createSubmission(payload) {
  const { data, error } = await supabase
    .from('assignment_submissions')
    .insert([payload])
    .select()
    .single();

  if (error) {
    return { error: error.message, errorObj: error, data: null };
  }
  return { data, error: null };
}

export async function updateSubmission(id, payload) {
  const { data, error } = await supabase
    .from('assignment_submissions')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { error: error.message, errorObj: error, data: null };
  }
  return { data, error: null };
}

export async function uploadSubmissionFile(path, file) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, { upsert: false });

  if (error) {
    return { error: error.message, data: null };
  }
  return { data, error: null };
}

export async function deleteSubmissionFile(path) {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path]);

  if (error) {
    return { error: error.message };
  }
  return { error: null };
}

export async function createSubmissionDownloadUrl(path) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(path, 300); // 5 minutes

  if (error) {
    return { error: error.message, data: null };
  }
  return { data: data.signedUrl, error: null };
}
