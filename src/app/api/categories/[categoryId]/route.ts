import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { bannerId } = await req.json();
		const { data, error } = await supabase
			.from("categories")
			.insert([{ bannerId }]);

		if (error) {
			throw new Error("Failed to create category");
		}

		return NextResponse.json({ success: true, data }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong while creating the category" },
			{ status: 500 }
		);
	}
}
