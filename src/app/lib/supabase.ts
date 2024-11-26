import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://sswtvaddbhvopqkejedo.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL or ANON Key is missing.');
  }
export const supabase = createClient(supabaseUrl, supabaseKey);
