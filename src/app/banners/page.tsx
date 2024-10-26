import BannersLayout from "@/components/Layouts/BannersLayout";
import { supabase } from "@/utils/supabase";

export default async function BannersPage() {
	async function fetchBannerData() {
		const { data, error } = await supabase.from("banners").select();
		if (error) {
			console.error("Error fetching banner data:", error);
			return [];
		}
		return data || [];
	}
	const bannersData = await fetchBannerData();

	return <BannersLayout banners={bannersData} />;
}
