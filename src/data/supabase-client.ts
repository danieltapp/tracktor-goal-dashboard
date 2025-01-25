import { createClient } from "@supabase/supabase-js";

const { VITE_SUPABASE_URL, VITE_SUPABASE_KEY } = import.meta.env;

if (!VITE_SUPABASE_URL || !VITE_SUPABASE_KEY) {
  throw new Error("Missing Supabase URL or Key");
}

const SUPABASE_URL = VITE_SUPABASE_URL;
const SUPABASE_KEY = VITE_SUPABASE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
