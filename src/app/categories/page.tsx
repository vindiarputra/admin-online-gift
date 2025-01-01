import CategoriesLayout from "@/components/Layouts/CategoriesLayout";
import { headers } from "next/headers";

export default async function CategoriesPage() {
	const headersList = headers();
	const host = headersList.get("host");
	const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
	const baseUrl = `${protocol}://${host}`;
	async function fetchCategoriesData() {
		const res = await fetch(`${baseUrl}/api/categories`);
		if (!res.ok) {
			throw new Error("Failed to fetch banner data");
		}
		return res.json();
	}
	const categoriesData = await fetchCategoriesData();

	return <CategoriesLayout categories={categoriesData} />;
}
