"use client";

import { useMemo, useState } from "react";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getSortedRowModel,
	SortingState,
	ColumnFiltersState,
	getFilteredRowModel,
	getPaginationRowModel,
	VisibilityState,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { ChevronDown, Filter, Search } from "lucide-react";

import { Item, Order } from "@/types";
import AscSortTableButton from "../Atoms/AscSortTableButton";
import DateSortTableButton from "../Atoms/DateSortTableButton";
import PaginationControls from "../moleculs/PaginationControls";

interface CustomColumnMeta {
	label?: string;
}

declare module "@tanstack/react-table" {
	interface ColumnMeta<TData, TValue> extends CustomColumnMeta {}
}

const columns: ColumnDef<Order>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => <AscSortTableButton column={column}>Order ID</AscSortTableButton>,
		meta: { label: "Order ID" },
	},
	{
		accessorKey: "created_at",
		header: ({ column }) => <DateSortTableButton column={column} />,
		cell: ({ row }) => {
			const date = new Date(row.getValue("created_at"));
			return date.toLocaleDateString("id-ID", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			});
		},
		meta: { label: "Order Date" },
	},
	{
		accessorKey: "clerk_id.name",
		header: ({ column }) => <AscSortTableButton column={column}>Customer Name</AscSortTableButton>,
		meta: { label: "Customer Name" },
	},
	{
		accessorKey: "clerk_id.email",
		header: ({ column }) => <AscSortTableButton column={column}>Customer Email</AscSortTableButton>,
		meta: { label: "Customer Email" },
	},
	{
		accessorKey: "clerk_id.tlp",
		header: ({ column }) => <AscSortTableButton column={column}>Customer Phone</AscSortTableButton>,
		meta: { label: "Customer Phone" },
	},
	{
		accessorKey: "clerk_id.address",
		header: "Customer Address",
		meta: { label: "Customer Address" },
	},
	{
		accessorKey: "gross_amount",
		header: ({ column }) => <AscSortTableButton column={column}>Total Amount</AscSortTableButton>,
		cell: ({ row }) => {
			const grossAmount = row.getValue("gross_amount") as number;
			return new Intl.NumberFormat("id-ID", {
				style: "currency",
				currency: "IDR",
			}).format(grossAmount);
		},
		meta: { label: "Total Amount" },
	},
	{
		accessorKey: "payment_type",
		header: ({ column }) => <AscSortTableButton column={column}>Payment Type</AscSortTableButton>,
		meta: { label: "Payment Type" },
	},
	{
		accessorKey: "bank",
		header: ({ column }) => <AscSortTableButton column={column}>Bank</AscSortTableButton>,
		meta: { label: "Bank" },
	},
	{
		accessorKey: "item",
		header: "Items",
		cell: ({ row }) => {
			const items = row.getValue("item") as Item[];
			return (
				<div>
					{items.map((item) => (
						<div key={item.id} className="flex items-center space-x-2 mb-2">
							<Image
								src={item.image}
								alt={item.label}
								width={50}
								height={50}
								className="rounded-md"
							/>
							<div>
								<p className="font-semibold">{item.label}</p>
								<p className="text-sm text-gray-500">Qty: {item.quantity}</p>
							</div>
						</div>
					))}
				</div>
			);
		},
		meta: { label: "Item" },
	},
];

interface OrderTableProps {
	data: Order[];
}

export function OrderTable({ data }: OrderTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [rowSelection, setRowSelection] = useState({});
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
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
	

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onRowSelectionChange: setRowSelection,
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnFilters,
			rowSelection,
			pagination,
			columnVisibility,
		},
		onPaginationChange: setPagination, // Update pagination state when changed
	});

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="relative max-w-sm">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
					<Input
						placeholder="Filter by Customer Name"
						value={(table.getColumn("clerk_id.name")?.getFilterValue() as string) ?? ""}
						onChange={(event) =>
							table.getColumn("clerk_id.name")?.setFilterValue(event.target.value)
						}
						className="w-96 pl-9 border-black border-2  focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md"
					/>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <Filter className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) => column.toggleVisibility(!!value)}>
										{column.columnDef.meta?.label || column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								))}
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
		</div>
	);
}
