import { BarChart, Image, LayoutGrid, Package, ShoppingBag, Users } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

// Mock data (replace with actual data fetching in a real application)
const summaryData = [
	{ title: "Total Revenue", value: "$45,231.89", icon: BarChart },
	{ title: "Products", value: "204", icon: Package },
	{ title: "Categories", value: "12", icon: LayoutGrid },
	{ title: "Customers", value: "2,341", icon: Users },
];

const banners = [
	{ id: 1, name: "Summer Sale", image: "https://picsum.photos/1920/600?random=1" },
	{ id: 2, name: "New Arrivals", image: "https://picsum.photos/1920/600?random=2" },
	{ id: 3, name: "Clearance", image: "https://picsum.photos/1920/600?random=3" },
];

const categories = [
	{ id: 1, name: "Electronics", productCount: 50 },
	{ id: 2, name: "Clothing", productCount: 120 },
	{ id: 3, name: "Home & Garden", productCount: 75 },
	{ id: 4, name: "Sports", productCount: 40 },
	{ id: 5, name: "Books", productCount: 100 },
	{ id: 6, name: "Toys", productCount: 60 },
];

const products = [
	{ id: 1, name: "Smartphone X", category: "Electronics", price: 599.99, stock: 50 },
	{ id: 2, name: "Designer T-shirt", category: "Clothing", price: 29.99, stock: 100 },
	{ id: 3, name: "Garden Tools Set", category: "Home & Garden", price: 89.99, stock: 30 },
	{ id: 4, name: "Fitness Tracker", category: "Sports", price: 79.99, stock: 75 },
	{ id: 5, name: "Bestseller Novel", category: "Books", price: 14.99, stock: 200 },
];

export default function Dashboard() {
	return (
		<div className="flex flex-col space-y-6 p-8">
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
							<img
								src={banner.image}
								alt={banner.name}
								className="h-[100px] w-[300px] rounded-md object-cover"
							/>
							<p className="mt-2 text-sm font-medium">{banner.name}</p>
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
						{categories.map((category) => (
							<div key={category.id} className="flex items-center space-x-4 rounded-md border p-4">
								<LayoutGrid className="h-6 w-6 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium leading-none">{category.name}</p>
									<p className="text-sm text-muted-foreground">{category.productCount} products</p>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Products Table */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Products</CardTitle>
						<Button size="sm">
							<ShoppingBag className="mr-2 h-4 w-4" />
							Add Product
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Stock</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{products.map((product) => (
								<TableRow key={product.id} className="px-10">
									<TableCell className="font-medium">{product.name}</TableCell>
									<TableCell>{product.category}</TableCell>
									<TableCell>${product.price.toFixed(2)}</TableCell>
									<TableCell>{product.stock}</TableCell>
									<TableCell>
										<Button variant="ghost" size="sm" asChild>
											<Link href={`/products/${product.id}`}>Edit</Link>
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
