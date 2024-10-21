import { supabase } from "@/utils/supabase";

export async function GET(req: Request, { params }: { params: { bannerId: string } }) {
	try {
		const { bannerId } = params;
		const { data, error } = await supabase.from("banners").select().eq("id", bannerId);
		if (error) {
			throw new Error(error.message);
		}
		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(error), { status: 500 });
	}
}

// export async function DELETE(req: Request, { params }: { params: { bannerId: string } }) {
//     try {
//         const { bannerId } = params;
//         const { data, error } = await supabase.from("banners").delete().eq("id", bannerId);
//         if (error) {
//             throw new Error(error.message);
//         }
//         return new Response(JSON.stringify(data), { status: 200 });
//     } catch (error) {
//         return new Response(JSON.stringify(error), { status: 500 });
//     }
// }

export async function PATCH(req: Request, { params }: { params: { bannerId: string } }) {
	try {
		const { bannerId } = params;
		const { label, image_url } = await req.json();
		const { data, error } = await supabase
			.from("banners")
			.update({ label: label, image_url: image_url })
			.eq("id", bannerId);
		if (error) {
			throw new Error(error.message);
		}
		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify(error), { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const { label, image_url } = await req.json();
		const { data, error } = await supabase
			.from("banners")
			.insert([{ label, image_url: image_url }]);

		if (error) {
			console.error("Error uploading data to Supabase:", error);
			return { success: false, error };
		}

		console.log("Successfully uploaded to Supabase:", data);
		return { success: true, data };
	} catch (error) {
		console.error("An error occurred during the upload:", error);
		return { success: false, error };
	}
}
