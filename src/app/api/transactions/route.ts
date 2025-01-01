import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		const { data, error } = await supabase.from("transactions").select(
			`
            *,
            clerk_id(*)
        `
		);

		if (error) {
			throw new Error(error.message);
		}
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
