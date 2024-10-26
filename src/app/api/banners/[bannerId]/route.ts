import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

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
		const { label, image_url, description } = await req.json();
		const { data, error } = await supabase
			.from("banners")
			.insert([{ label, image_url, description }]);

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
export async function DELETE(req: Request, { params }: { params: { bannerId: string } }) {
	const generateSHA1 = (data: string) => {
		const hash = crypto.createHash("sha1");
		hash.update(data);
		return hash.digest("hex");
	};

	const generateSignature = (publicId: string, apiSecret: string) => {
		return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
	};

	const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
	const timestamp = Math.floor(new Date().getTime() / 1000); // Use UNIX timestamp
	const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
	const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!!;

	const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

	try {
		// Fetch the image URL from the banners table
		const { data, error } = await supabase
			.from("banners")
			.select("image_url")
			.eq("id", params.bannerId)
			.single(); // Ensure we are getting a single result

		if (error) {
			throw new Error("Failed to retrieve banner image URL");
		}

		// Extract the public ID from the image URL
		const getPublicIdFromUrl = (url: string): string => {
			const parts = url.split("/");
			const publicIdWithExtension = parts[parts.length - 1];
			return publicIdWithExtension.split(".")[0]; // Remove the file extension
		};

		const publicId = getPublicIdFromUrl(data.image_url);
		const signature = generateSHA1(generateSignature(publicId, apiSecret));

		// Request to delete the image from Cloudinary
		const cloudinaryResponse = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				public_id: publicId,
				signature: signature,
				api_key: apiKey,
				timestamp: timestamp,
			}),
		});

		if (!cloudinaryResponse.ok) {
			throw new Error("Failed to delete image from Cloudinary");
		}

		const cloudinaryResult = await cloudinaryResponse.json();
		console.log("Image deleted from Cloudinary:", cloudinaryResult);

		// Delete the banner from the database
		const deleteResponse = await supabase.from("banners").delete().eq("id", params.bannerId);

		if (deleteResponse.error) {
			throw new Error("Failed to delete banner from database");
		}
		return NextResponse.json({ message: "Banner and image deleted successfully" }, { status: 200 });
	} catch (error) {
		console.error("Error deleting banner:", error);
		return NextResponse.json(
			{ message: "Something went wrong while deleting the banner" },
			{ status: 500 }
		);
	}
}

