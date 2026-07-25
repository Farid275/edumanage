import { supabase } from '../../../lib/supabaseClient';

export async function getLecturers() {
  const { data: lecturerRows, error: lecturerError } = await supabase
    .from('lecturers')
    .select(`
      id,
      lecturer_number,
      department,
      academic_title,
      specialization,
      employment_status,
      office_location,
      created_by,
      created_at,
      updated_at,
      profile:profiles!lecturers_id_fkey (
        id,
        full_name,
        role
      )
    `);

  if (lecturerError) {
    console.error('[Lecturers] Failed to fetch lecturers:', lecturerError);
    throw lecturerError;
  }

  const lecturerIds = (lecturerRows || []).map((lecturer) => lecturer.id);
  let courseRows = [];

  if (lecturerIds.length > 0) {
    const { data, error: courseError } = await supabase
      .from('courses')
      .select(`
        id,
        course_code,
        course_name,
        lecturer_id,
        status
      `)
      .in('lecturer_id', lecturerIds);

    if (courseError) {
      console.error('[Lecturers] Failed to fetch assigned courses:', courseError);
      throw courseError;
    }
    courseRows = data || [];
  }

  const coursesByLecturer = new Map();
  for (const course of courseRows) {
    if (!course.lecturer_id) continue;
    const current = coursesByLecturer.get(course.lecturer_id) ?? [];
    current.push(course);
    coursesByLecturer.set(course.lecturer_id, current);
  }

  const lecturers = (lecturerRows || []).map((lecturer) => {
    const assignedCourses = coursesByLecturer.get(lecturer.id) ?? [];
    return {
      ...lecturer,
      full_name: lecturer.profile?.full_name ?? 'Unknown Lecturer',
      assigned_courses: assignedCourses,
      assigned_course_count: assignedCourses.length,
    };
  });

  lecturers.sort((a, b) => a.full_name.localeCompare(b.full_name));

  return { data: lecturers, error: null };
}

export async function getAvailableLecturerProfiles() {
  // Fetch profiles with role = 'lecturer'
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, full_name, role')
    .eq('role', 'lecturer');

  if (profilesError) {
    return { error: profilesError.message, data: null };
  }

  // Fetch existing lecturer record IDs
  const { data: lecturers, error: lecturersError } = await supabase
    .from('lecturers')
    .select('id');

  if (lecturersError) {
    return { error: lecturersError.message, data: null };
  }

  const existingIds = new Set(lecturers.map(l => l.id));
  
  // Filter out those who already have a record
  const availableProfiles = profiles.filter(p => !existingIds.has(p.id));

  // Sort available profiles by full_name ascending
  availableProfiles.sort((a, b) => a.full_name.localeCompare(b.full_name));

  return { data: availableProfiles, error: null };
}

export async function createLecturerRecord(payload) {
  const { data, error } = await supabase
    .from('lecturers')
    .insert([payload])
    .select()
    .single();

  if (error) {
    // Check for unique constraint violation (duplicate lecturer_number)
    if (error.code === '23505' || error.message.includes('unique')) {
      return { error: 'This Lecturer Number is already registered.', data: null };
    }
    return { error: error.message, data: null };
  }

  return { data, error: null };
}

export async function updateLecturerRecord(id, payload) {
  const { data, error } = await supabase
    .from('lecturers')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    // Check for unique constraint violation (duplicate lecturer_number)
    if (error.code === '23505' || error.message.includes('unique')) {
      return { error: 'This Lecturer Number is already registered.', data: null };
    }
    return { error: error.message, data: null };
  }

  return { data, error: null };
}

export async function getLecturerAssignedCourses(lecturerId) {
  const { data, error } = await supabase
    .from('courses')
    .select('id, course_code, course_name')
    .eq('lecturer_id', lecturerId);

  if (error) {
    return { error: error.message, data: null };
  }

  return { data, error: null };
}

export async function deleteLecturerRecord(id) {
  // Defensive check in API layer as well
  const { data: courses, error: coursesError } = await getLecturerAssignedCourses(id);
  
  if (coursesError) {
    return { error: 'Failed to verify course assignments before deletion.', data: null };
  }

  if (courses && courses.length > 0) {
    return { 
      error: 'This lecturer is still assigned to one or more courses. Reassign or remove those course assignments before deleting the academic record.',
      data: null 
    };
  }

  const { error } = await supabase
    .from('lecturers')
    .delete()
    .eq('id', id);

  if (error) {
    return { error: error.message, data: null };
  }

  return { data: true, error: null };
}
