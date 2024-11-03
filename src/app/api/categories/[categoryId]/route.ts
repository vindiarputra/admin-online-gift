import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { bannerId, label } = await req.json();
		const { data, error } = await supabase.from("categories").insert([{ bannerId, label}]);

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

export async function DELETE(req: Request, { params }: { params: { categoryId: string } }) {
	try {
		const deleteResponse = await supabase.from("categories").delete().eq("id", params.categoryId);

		if (deleteResponse.error) {
			throw new Error("Failed to delete category");
		}

		return NextResponse.json({ message: "category deleted successfully" }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong while deleting the category" },
			{ status: 500 }
		);
	}
}

export async function GET(req: Request, { params }: { params: { categoryId: string } }) {
	try {
		const { categoryId } = params;
		const { data, error } = await supabase.from("categories").select(`*, bannerId(*)`).eq("id", categoryId);
		if (error) {
			throw new Error("Failed to fetch category");
		}
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong while fetching the category" },
			{ status: 500 }
		);
	}
}

export async function PATCH(req: Request, { params }: { params: { categoryId: string } }) {
	try {
		const { categoryId } = params;
		const { label, bannerId } = await req.json();
		const { data, error } = await supabase
			.from("categories")
			.update({ label, bannerId })
			.eq("id", categoryId);
		if (error) {
			throw new Error("Failed to update category");
		}
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong while updating the category" },
			{ status: 500 }
		);
	}
}
