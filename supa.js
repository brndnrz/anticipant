import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://ejtazfstnusjfjtfhgkv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqdGF6ZnN0bnVzamZqdGZoZ2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzOTU4NTUsImV4cCI6MTk3ODk3MTg1NX0.5Geufe6YgQVBIgcoqEHkd1s4BxewcEgQJQC60jL0QXI",
  { multiTab: false }
);

export default supabase;
