// This file is deprecated and should not be used.
// Use lib/supabase/client.ts for browser clients
// and lib/supabase/server.ts for server components instead.
export { createClient as supabase } from './supabase/client';

export const getUser = async () => {
  const client = createClient();
  const { data: { user }, error } = await client.auth.getUser();
  if (error) throw error;
  return user;
};

export const signOut = async () => {
  const client = createClient();
  const { error } = await client.auth.signOut();
  if (error) throw error;
};