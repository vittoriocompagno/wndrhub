import { createBrowserClient } from '@supabase/ssr';

// Create a singleton instance
let client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  // Return existing instance if available
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  // Create new instance
  client = createBrowserClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    cookies: {
      name: 'sb-auth',
      lifetime: 60 * 60 * 24 * 7, // 7 days
      domain: '',
      path: '/',
      sameSite: 'lax'
    }
  });

  return client;
}