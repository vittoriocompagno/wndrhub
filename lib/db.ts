import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function createTables() {
  const { error: userError } = await supabase.rpc('create_users_table');
  if (userError) console.error('Error creating users table:', userError);

  const { error: propertyError } = await supabase.rpc('create_properties_table');
  if (propertyError) console.error('Error creating properties table:', propertyError);

  const { error: analyticsError } = await supabase.rpc('create_analytics_table');
  if (analyticsError) console.error('Error creating analytics table:', analyticsError);
}

// Initialize database tables
createTables();