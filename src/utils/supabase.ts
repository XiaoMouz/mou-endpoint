import { createClient } from '@supabase/supabase-js'
const env = process.env
if (!env.SUPABASE_URL || !env.SUPABASE_KEY) {
  throw new Error('Missing env variables for Supabase')
}
const supbase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY)

export function useCleint() {
  return supbase
}
