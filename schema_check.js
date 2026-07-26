import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf-8').split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val.length > 0) acc[key.trim()] = val.join('=').trim();
  return acc;
}, {});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY);

async function check() {
  console.log("Checking assignment_submissions table:");
  const sub = await supabase.from('assignment_submissions').select('*').limit(1);
  console.log(sub.data, sub.error);

  console.log("Checking assignments table:");
  const a = await supabase.from('assignments').select('*').limit(1);
  console.log(a.data, a.error);

  console.log("Checking courses table:");
  const c = await supabase.from('courses').select('*').limit(1);
  console.log(c.data, c.error);

  console.log("Checking lecturers table:");
  const l = await supabase.from('lecturers').select('*').limit(1);
  console.log(l.data, l.error);
}
check();
