import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '~/types/database.types'

var supbase: SupabaseClient<Database> | null = null
export function useClient() {
  if (!supbase) {
    const env = process.env
    if (!env.SUPABASE_URL || !(env.SUPABASE_KEY && env.SUPABASE_SERVICE_KEY)) {
      throw new Error(
        'Missing env variables for Supabase' + JSON.stringify(env)
      )
    }
    supbase = createClient<Database>(
      env.SUPABASE_URL,
      env.SUPABASE_SERVICE_KEY || env.SUPABASE_KEY
    )
  }

  return supbase
}
