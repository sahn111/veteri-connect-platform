// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yeuzoidjugfdbpcuaifd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlldXpvaWRqdWdmZGJwY3VhaWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NTcwMjcsImV4cCI6MjA1MDAzMzAyN30.Bc7t8ufQ95h3rySYc70lm8uQ9HDZY_aaDBROecv1q3s";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);