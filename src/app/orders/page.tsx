import { OrderTable } from "@/components/organisms/OrderTable";
import { headers } from "next/headers";


export default async function OrdersPage() {
		const headersList = headers();
		const host = headersList.get("host");
		const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
		const baseUrl = `${protocol}://${host}`;
		async function fetchOrdersData() {
			const res = await fetch(`${baseUrl}/api/transactions`);
			if (!res.ok) {
				throw new Error("Failed to fetch banner data");
			}
			return res.json();
	}
	
	const orders = await fetchOrdersData();
	return (
		<div className="container mx-auto py-10">
			<h1 className="text-2xl font-bold mb-5">Orders</h1>
			<OrderTable data={orders} />
		</div>
	);
}
