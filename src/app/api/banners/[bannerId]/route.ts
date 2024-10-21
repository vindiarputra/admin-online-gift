import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

// GET: Mengambil data banner berdasarkan bannerId
export async function GET(req: Request, { params }: { params: { bannerId: string } }) {
	try {
		const { bannerId } = params;
		const { data, error } = await supabase.from("banners").select().eq("id", bannerId);
		if (error) {
			throw new Error("Failed to fetch banner");
		}
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong while fetching the banner" },
			{ status: 500 }
		);
	}
}

// PATCH: Memperbarui data banner berdasarkan bannerId
export async function PATCH(req: Request, { params }: { params: { bannerId: string } }) {
	try {
		const { bannerId } = params;
		const { label, image_url } = await req.json();
		const { data, error } = await supabase
			.from("banners")
			.update({ label, image_url })
			.eq("id", bannerId);
		if (error) {
			throw new Error("Failed to update banner");
		}
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong while updating the banner" },
			{ status: 500 }
		);
	}
}

// POST: Menambahkan banner baru
export async function POST(req: Request) {
	try {
		const { label, image_url } = await req.json();
		const { data, error } = await supabase.from("banners").insert([{ label, image_url }]);

		if (error) {
			throw new Error("Failed to create banner");
		}

		return NextResponse.json({ success: true, data }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong while creating the banner" },
			{ status: 500 }
		);
	}
}
