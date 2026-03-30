import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://fkfkmvkfxopwauvtllfi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrZmttdmtmeG9wd2F1dnRsbGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MjMyMjQsImV4cCI6MjA5MDM5OTIyNH0.dIOzZFHJfkAr2smhqy_o1Pxu2y3B_Mn1F3qzmlMbSRA";

export const supabase = createClient(supabaseUrl, supabaseKey);