import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://uautvfaosxoyaixerzoq.supabase.co', 
  'sb_publishable_On8bNtmQhYEgydQfT4a5tg_GRTCskGc'
);

async function check() {
  const { data, error } = await supabase
    .from('assignment_submissions')
    .select('id, student_id, assignment_id')
    .limit(1);
    
  console.log("Submissions response:", { data, error });
}

check();
