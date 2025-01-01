import { BarChart, DollarSign, LayoutGrid, Package, ShoppingCart, TicketSlash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import RevenueChart from "@/components/organisms/RevenueChart";
import { TopProductTable } from "@/components/organisms/TopProductTable";
import { headers } from "next/headers";
import { Banner, Category, CategoryWithProductCount, Product, Transaction } from "@/types";





export default async function Dashboard() {
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

	const fetchCategoriesData = async (): Promise<Category[]> => {
		const res = await fetch(`${baseUrl}/api/categories`);
		if (!res.ok) {
			throw new Error("Failed to fetch categories data");
		}
		return res.json();
	};

	const fetchProductsData = async (): Promise<Product[]> => {
		const res = await fetch(`${baseUrl}/api/products`);
		if (!res.ok) {
			throw new Error("Failed to fetch products data");
		}
		return res.json();
	};

	const fetchOrdersData = async (): Promise<Transaction[]> => {
		const res = await fetch(`${baseUrl}/api/transactions`);
		if (!res.ok) {
			throw new Error("Failed to fetch Orders data");
		}
		return res.json();
	};

	try {
		const [banners, categories, products, orders] = await Promise.all([
			fetchBannerData(),
			fetchCategoriesData(),
			fetchProductsData(),
			fetchOrdersData(),
		]);

		const totalRevenue = orders.reduce((sum, order) => sum + order.gross_amount, 0);
		const totalOrders = orders.length;
		const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

		const totalProductsPerCategory = products.reduce<Record<string, number>>(
			(productCountMap, product) => {
				const categoryId = product.categoryId;
				if (!productCountMap[categoryId]) {
					productCountMap[categoryId] = 0;
				}
				productCountMap[categoryId] += 1;
				return productCountMap;
			},
			{}
		);

		const categoriesWithProductCount: CategoryWithProductCount[] = categories.map((category) => ({
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
			{
				title: "Total Revenue",
				value: `Rp ${totalRevenue.toLocaleString("id-ID")}`,
				icon: DollarSign,
			},

			{
				title: "Orders",
				value: totalOrders,
				icon: ShoppingCart,
			},
			{
				title: "Average Order Value",
				value: `Rp ${averageOrderValue.toLocaleString("id-ID")}`,
				icon: BarChart,
			},
		];

		return (
			<div className="flex flex-col space-y-6 p-4 md:p-8 lg:px-16">
				<h1 className="text-3xl font-bold">Dashboard</h1>

				{/* Summary Cards */}
				<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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

				<div className="grid grid-cols-1 gap-6 mb-6">
					<RevenueChart orders={orders} />
				</div>

				<TopProductTable orders={orders} />

				{/* Banners Section */}
				<Card>
					<CardHeader>
						<CardTitle>Banners</CardTitle>
					</CardHeader>
					<CardContent className="flex gap-4 overflow-x-auto pb-4">
						{banners.length > 0 ? (
							banners.map((banner: Banner) => (
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
							))
						) : (
							<div className="text-gray-500 p-4 text-center">No banners available</div>
						)}
					</CardContent>
				</Card>

				{/* Categories Section */}
				<Card>
					<CardHeader>
						<CardTitle>Categories</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
							{categoriesWithProductCount.map((category) => (
								<div
									key={category.id}
									className="flex items-center space-x-4 rounded-md border p-4">
									<LayoutGrid className="h-6 w-6 text-muted-foreground" />
									<div>
										<p className="text-sm font-medium leading-none">{category.label}</p>
										<p className="text-sm text-muted-foreground">
											{category.productCount} products
										</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		);
	} catch (error) {
		console.error("Error fetching data:", error);
		return <div>Error loading dashboard data. Please try again later.</div>;
	}
}
