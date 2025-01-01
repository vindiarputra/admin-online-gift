import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		const { data, error } = await supabase.from("banners").select();
		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		if (!data || data.length === 0) {
			return NextResponse.json({ error: "Banners not found" }, { status: 404 });
		}

		return NextResponse.json(data , { status: 200 });
	} catch (error) {
		console.error("Server error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
