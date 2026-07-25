import { supabase } from '../../../lib/supabaseClient';

export async function getStudents() {
  const { data, error } = await supabase
    .from('students')
    .select(`
      *,
      profiles(id, full_name, role),
      course_enrollments(count)
    `)
    .order('profiles(full_name)', { ascending: true }); // We will sort it in memory if this fails

  if (error) throw error;
  
  // Sort in memory by full name as Supabase nested sort can sometimes be tricky
  data.sort((a, b) => {
    const nameA = a.profiles?.full_name || '';
    const nameB = b.profiles?.full_name || '';
    return nameA.localeCompare(nameB);
  });

  return data;
}

export async function getAvailableStudentProfiles() {
  // Fetch all profiles that are students
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, full_name, role')
    .eq('role', 'student');

  if (profilesError) throw profilesError;

  // Fetch all existing student academic records
  const { data: students, error: studentsError } = await supabase
    .from('students')
    .select('id');

  if (studentsError) throw studentsError;

  const existingStudentIds = new Set(students.map(s => s.id));
  
  // Filter out profiles that already have a student record
  return profiles.filter(p => !existingStudentIds.has(p.id));
}

export async function createStudentRecord(payload) {
  const { data, error } = await supabase
    .from('students')
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateStudentRecord(id, payload) {
  const { data, error } = await supabase
    .from('students')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteStudentRecord(id) {
  const { error } = await supabase
    .from('students')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}
