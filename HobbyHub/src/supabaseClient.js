import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ynebeqizgyovjtsuhroz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluZWJlcWl6Z3lvdmp0c3Vocm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2Nzg1NjUsImV4cCI6MjA0NzI1NDU2NX0.dBQFqhb3vnsjXzi9M1VE0q4gi0Tl36Be_ZXExzjBqdQ';
export const supabase = createClient(supabaseUrl, supabaseKey);