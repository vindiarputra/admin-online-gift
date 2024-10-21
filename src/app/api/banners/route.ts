// pages/api/banners.js
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(req: Request) {
    try {
        const { data, error } = await supabase.from("banners").select();
        if (error) {
            throw new Error(error.message);
        }
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}