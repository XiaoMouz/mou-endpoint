import { createClient } from '@supabase/supabase-js'
import { Database } from '~/types/database.types'
const env = process.env
if (!env.SUPABASE_URL || !(env.SUPABASE_KEY && env.SUPABASE_SERVICE_KEY)) {
  throw new Error('Missing env variables for Supabase')
}
const supbase = createClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_KEY || env.SUPABASE_KEY
)

export function useCleint() {
  return supbase
}
