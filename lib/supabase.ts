import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://pntgteixwpulbmmdzcbk.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBudGd0ZWl4d3B1bGJtbWR6Y2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MTUyMzksImV4cCI6MjA2NzM5MTIzOX0.ggN26dYuhXTmW2ok--D1gVQ7sis3Qpi_p1AIG0ykmDk"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})