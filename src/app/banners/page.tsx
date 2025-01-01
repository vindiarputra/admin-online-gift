import BannersLayout from "@/components/Layouts/BannersLayout";
import { Banner } from "@/types";
import { headers } from "next/headers";

export default async function BannersPage() {
	const headersList = headers();
	const host = headersList.get("host");
	const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
	const baseUrl = `${protocol}://${host}`;
	const fetchBannerData = async (): Promise<Banner[]> => {
		const res = await fetch(`${baseUrl}/api/banners`);
		if (!res.ok) {
			throw new Error("Failed to fetch banner data");
		}
		return res.json();
	};
	const bannersData = await fetchBannerData();

	return <BannersLayout banners={bannersData} />;
}
