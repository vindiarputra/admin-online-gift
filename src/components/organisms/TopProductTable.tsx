"use client";

import { useState, useMemo } from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PaginationControls from "../moleculs/PaginationControls";

interface OrderItem {
	id: string;
	label: string;
	price: number;
	quantity: number;
}

interface Order {
	id: string;
	created_at: string;
	clerk_id: {
		id: string;
		name: string;
		email: string;
	};
	gross_amount: number;
	payment_type: string;
	bank: string;
	item: OrderItem[];
}

interface ProductSummary {
	id: string;
	label: string;
	price: number;
	quantity: number;
	sold: number;
}

const columns: ColumnDef<ProductSummary>[] = [
	{
		accessorKey: "label",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Product
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="font-medium">{row.getValue("label")}</div>,
	},
	{
		accessorKey: "price",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Price
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const price = parseFloat(row.getValue("price"));
			const formatted = new Intl.NumberFormat("id-ID", {
				style: "currency",
				currency: "IDR",
			}).format(price);

			return <div className="text-left font-medium">{formatted}</div>;
		},
	},
	{
		accessorKey: "quantity",
		header: ({ column }) => {
			return (
				<Button
					className="flex place-self-center"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Quantity Sold
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue("quantity")}</div>;
		},
	},
];

interface TopProductTableProps {
	orders: Order[];
}

export function TopProductTable({ orders }: TopProductTableProps) {
	const [sorting, setSorting] = useState<SortingState>([{ id: "quantity", desc: true }]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [{ pageIndex, pageSize }, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});

	const pagination = useMemo(
		() => ({
			pageIndex,
			pageSize,
		}),
		[pageIndex, pageSize]
	);
	

	const data = useMemo(() => {
		const productMap = new Map<string, ProductSummary>();

		orders.forEach((order) => {
			order.item.forEach((item) => {
				const existingProduct = productMap.get(item.id);
				if (existingProduct) {
					existingProduct.sold += item.quantity;
				} else {
					productMap.set(item.id, {
						...item,
						sold: item.quantity,
					});
				}
			});
		});

		return Array.from(productMap.values());
	}, [orders]);

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			pagination,
		},
		onPaginationChange: setPagination, // Update pagination state when changed
	});

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Top Products</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mb-4 flex items-center gap-4">
					<div className="relative max-w-sm">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
						<Input
							placeholder="Filter products..."
							value={(table.getColumn("label")?.getFilterValue() as string) ?? ""}
							onChange={(event) => table.getColumn("label")?.setFilterValue(event.target.value)}
							className="w-96 pl-9 border-black border-2  focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md"
						/>
					</div>
				</div>
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id} className="justify-self-center ">
												{header.isPlaceholder
													? null
													: flexRender(header.column.columnDef.header, header.getContext())}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={columns.length} className="h-24 text-center">
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<div className="flex items-center justify-between space-x-2 py-4">
					<PaginationControls table={table} />
				</div>
			</CardContent>
		</Card>
	);
}
