import { supabase } from '../../../lib/supabaseClient';

export async function getCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      profiles(id, full_name, role)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getLecturers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, role')
    .eq('role', 'lecturer');

  if (error) throw error;
  return data;
}

export async function createCourse(payload) {
  const { data, error } = await supabase
    .from('courses')
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCourse(id, payload) {
  const { data, error } = await supabase
    .from('courses')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCourse(id) {
  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}
