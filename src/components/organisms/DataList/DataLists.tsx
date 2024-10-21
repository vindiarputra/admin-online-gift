import { supabase } from "@/utils/supabase";
import { Banners, columns } from "./Columns";
import { DataTable } from "./DataTable";

async function fetchBannerData() {
	const { data, error } = await supabase.from("banners").select();
	if (error) {
		console.error("Error fetching banner data:", error);
		return [];
	}
	return data || [];
}

export default async function DataLists() {
	const bannerData = await fetchBannerData();

	return (
		<div className="container mx-auto">
			<DataTable columns={columns} data={bannerData} />
		</div>
	);
}
