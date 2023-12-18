import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://dzetcmoqhnkfyaaghnly.supabase.co', process.env.SUPABASE_TOKEN);

export default supabase;