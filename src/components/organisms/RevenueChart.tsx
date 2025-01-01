"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface OrderItem {
	id: string;
	label: string;
	price: number;
	quantity: number;
}

interface Order {
	id: string;
	created_at: string;
	gross_amount: number;
	item: OrderItem[];
}

interface RevenueChartProps {
	orders: Order[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ orders }) => {
	const monthlyData = orders.reduce((acc, order) => {
		const date = new Date(order.created_at);
		const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

		if (!acc[monthYear]) {
			acc[monthYear] = 0;
		}
		acc[monthYear] += order.gross_amount; // Dalam Rupiah
		return acc;
	}, {} as Record<string, number>);

	const chartData = Object.entries(monthlyData)
		.map(([month, revenue]) => ({
			name: month,
			total: Number(revenue.toFixed(2)),
		}))
		.sort((a, b) => a.name.localeCompare(b.name));

	return (
		<Card>
			<CardHeader>
				<CardTitle>Monthly Revenue</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={350} >
					<LineChart data={chartData}>
						<XAxis
							dataKey="name"
							stroke="#888888"
							fontSize={12}
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => {
								const [year, month] = value.split("-");
								return `${month}/${year.slice(2)}`;
							}}
						/>
						<YAxis
							stroke="#888888"
							fontSize={11}
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => 
								`${value.toLocaleString("id-ID")}`}
							
						/>
						<Tooltip
							content={({ active, payload }) => {
								if (active && payload && payload.length) {
									return (
										<div className="rounded-lg border bg-background p-2 shadow-sm">
											<div className="grid grid-cols-2 gap-2">
												<div className="flex flex-col">
													<span className="text-[0.70rem] uppercase text-muted-foreground">
														Month
													</span>
													<span className="font-bold text-muted-foreground">
														{payload[0].payload.name}
													</span>
												</div>
												<div className="flex flex-col">
													<span className="text-[0.70rem] uppercase text-muted-foreground">
														Revenue
													</span>
													<span className="font-bold">
														Rp {payload[0]?.value?.toLocaleString("id-ID")}
													</span>
												</div>
											</div>
										</div>
									);
								}
								return null;
							}}
						/>
						<Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};

export default RevenueChart;
