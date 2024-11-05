import { LayoutGrid, Package, TicketSlash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { supabase } from "@/utils/supabase";
import Image from "next/image";

const fetchBannerData = async () => {
	const { data, error } = await supabase.from("banners").select();

	if (error) {
		console.error(error);
		return [];
	}
	return data || [];
};

const fetchCategoriesData = async () => {
	const { data, error } = await supabase.from("categories").select();

	if (error) {
		console.error(error);
		return [];
	}
	return data || [];
};

const fetchProductsData = async () => {
	const { data, error } = await supabase.from("products").select();

	if (error) {
		console.error(error);
		return [];
	}
	return data || [];
};

export default async function Dashboard() {
	const banners = await fetchBannerData();
	const categories = await fetchCategoriesData();
	const products = await fetchProductsData();

	const totalProductsPerCategory = products.reduce((productCountMap, product) => {
		const categoryId = product.categoryId;
		if (!productCountMap[categoryId]) {
			productCountMap[categoryId] = 0;
		}
		productCountMap[categoryId] += 1;

		return productCountMap;
	}, {});

	const categoriesWithProductCount = categories.map((category) => ({
		...category,
		productCount: totalProductsPerCategory[category.id] || 0,
	}));

	const summaryData = [
		{
			title: "Products",
			value: products.length,
			icon: Package,
		},
		{
			title: "Categories",
			value: categories.length,
			icon: LayoutGrid,
		},
		{
			title: "Banners",
			value: banners.length,
			icon: TicketSlash,
		},
	];

	return (
		<div className="flex flex-col space-y-6 p-8 px-16">
			<h1 className="text-3xl font-bold">Dashboard</h1>

			{/* Summary Cards */}
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{summaryData.map((item) => (
					<Card key={item.title}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">{item.title}</CardTitle>
							<item.icon className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{item.value}</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Banners Section */}
			<Card>
				<CardHeader>
					<CardTitle>Banners</CardTitle>
				</CardHeader>
				<CardContent className="flex gap-4 overflow-x-auto pb-4">
					{banners.map((banner) => (
						<div key={banner.id} className="flex-shrink-0">
							<Image
								width={300}
								height={100}
								src={banner.image_url}
								alt={banner.label}
								className="h-[100px] w-[300px] rounded-md object-cover"
							/>
							<p className="mt-2 text-sm font-medium">{banner.label}</p>
						</div>
					))}
				</CardContent>
			</Card>

			{/* Categories Section */}
			<Card>
				<CardHeader>
					<CardTitle>Categories</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{categoriesWithProductCount.map((category) => (
							<div key={category.id} className="flex items-center space-x-4 rounded-md border p-4">
								<LayoutGrid className="h-6 w-6 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium leading-none">{category.label}</p>
									<p className="text-sm text-muted-foreground">{category.productCount} products</p>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
