import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient) {
    return cachedClient;
  }

  const rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '').trim();
  const supabaseKey = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    ''
  ).trim();

  if (!rawUrl || !supabaseKey) {
    return null;
  }

  // Clean trailing slashes and /rest/v1 suffixes if mistakenly entered in environment variables
  const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');

  try {
    cachedClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    return cachedClient;
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err instanceof Error ? err.message : 'Unknown error');
    return null;
  }
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseClient() !== null;
}
