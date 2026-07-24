import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (
  !supabaseUrl || 
  !supabasePublishableKey || 
  supabaseUrl === "PASTE_PROJECT_URL" ||
  supabasePublishableKey === "PASTE_PUBLISHABLE_KEY"
) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY. Please update your .env file with real credentials."
  );
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
