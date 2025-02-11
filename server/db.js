require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

console.log('Supabase Key:', process.env.SUPABASE_KEY);

const supabaseUrl = 'https://rayjpvhzhwpxioqrcbdw.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Export the supabase instance
module.exports = supabase;

