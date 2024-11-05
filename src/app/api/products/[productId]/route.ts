import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { categoryId, label, description, price, isNew, onSale, isFeatured, stock, images_url } =
			await req.json();
		const { data, error } = await supabase
			.from("products")
			.insert([
				{ categoryId, label, description, price, isNew, onSale, isFeatured, stock, images_url },
			]);

		if (error) {
			throw new Error("Failed to create products");
		}

		return NextResponse.json({ success: true, data }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong while creating the products" },
			{ status: 500 }
		);
	}
}

export async function PATCH(req: Request, { params }: { params: { productId: string } }) {
	try {
		const { productId } = params;
		const { categoryId, label, description, price, isNew, onSale, isFeatured, stock, images_url } =
			await req.json();
		const { data, error } = await supabase
			.from("products")
			.update([
				{ categoryId, label, description, price, isNew, onSale, isFeatured, stock, images_url },
			])
			.eq("id", productId);

		if (error) {
			throw new Error("Failed to update product");
		}

		return NextResponse.json({ success: true, data }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong while updating the product" },
			{ status: 500 }
		);
	}
}

export async function DELETE(req: Request, { params }: { params: { productId: string } }) {
	try {
		const deleteResponse = await supabase.from("products").delete().eq("id", params.productId);

		if (deleteResponse.error) {
			throw new Error("Failed to delete product");
		}

		return NextResponse.json({ message: "product deleted successfully" }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong while deleting the product" },
			{ status: 500 }
		);
	}
}

export async function GET(req: Request, { params }: { params: { productId: string } }) {
	try {
		const { productId } = params;
		const { data, error } = await supabase.from("products").select().eq("id", productId);
		if (error) {
			throw new Error("Failed to fetch product");
		}
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong while fetching the product" },
			{ status: 500 }
		);
	}
}
