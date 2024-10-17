import { createClient } from "@supabase/supabase-js";
import { UUID } from "crypto";

export const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL as string,
	process.env.NEXT_PUBLIC_SUPABASE_KEY as string
);
