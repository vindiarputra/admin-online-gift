"use client";

import { useState } from "react";
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
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import {
	ChevronDown,
	ChevronUp,
	ChevronsUpDown,
	Search,
	Clock,
	ClockIcon as ClockRewind,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Item, Order } from "@/types";

interface SortButtonProps {
	column: any;
	children: React.ReactNode;
}

function SortButton({ column, children }: SortButtonProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
					<span>{children}</span>
					{column.getIsSorted() === "desc" ? (
						<ChevronDown className="ml-2 h-4 w-4" />
					) : column.getIsSorted() === "asc" ? (
						<ChevronUp className="ml-2 h-4 w-4" />
					) : (
						<ChevronsUpDown className="ml-2 h-4 w-4" />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
					<ChevronUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Ascending
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
					<ChevronDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Descending
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function DateSortButton({ column }: { column: any }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
					<span>Order Date</span>
					{column.getIsSorted() === "desc" ? (
						<Clock className="ml-2 h-4 w-4" />
					) : column.getIsSorted() === "asc" ? (
						<ClockRewind className="ml-2 h-4 w-4" />
					) : (
						<ChevronsUpDown className="ml-2 h-4 w-4" />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
					<Clock className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Newest
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
					<ClockRewind className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Oldest
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

const columns: ColumnDef<Order>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => <SortButton column={column}>Order ID</SortButton>,
	},
	{
		accessorKey: "created_at",
		header: ({ column }) => <DateSortButton column={column} />,
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
	},
	{
		accessorKey: "clerk_id.name",
		header: ({ column }) => <SortButton column={column}>Customer Name</SortButton>,
	},
	{
		accessorKey: "clerk_id.email",
		header: ({ column }) => <SortButton column={column}>Customer Email</SortButton>,
	},
	{
		accessorKey: "clerk_id.tlp",
		header: ({ column }) => <SortButton column={column}>Customer Phone</SortButton>,
	},
	{
		accessorKey: "clerk_id.address",
		header: "Customer Address",
	},
	{
		accessorKey: "gross_amount",
		header: ({ column }) => <SortButton column={column}>Total Amount</SortButton>,
		cell: ({ row }) => {
			const grossAmount = row.getValue("gross_amount") as number;
			return new Intl.NumberFormat("id-ID", {
				style: "currency",
				currency: "IDR",
			}).format(grossAmount);
		},
	},
	{
		accessorKey: "payment_type",
		header: ({ column }) => <SortButton column={column}>Payment Type</SortButton>,
	},
	{
		accessorKey: "bank",
		header: ({ column }) => <SortButton column={column}>Bank</SortButton>,
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
	},
];

interface OrderTableProps {
	data: Order[];
}

export function OrderTable({ data }: OrderTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [rowSelection, setRowSelection] = useState({});
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 }); // Set pagination state

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
		state: {
			sorting,
			columnFilters,
			rowSelection,
			pagination,
		},
		onPaginationChange: setPagination, // Update pagination state when changed
	});

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="relative max-w-sm">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
					<Input
						placeholder="Filter orders..."
						value={(table.getColumn("clerk_id.name")?.getFilterValue() as string) ?? ""}
						onChange={(event) =>
							table.getColumn("clerk_id.name")?.setFilterValue(event.target.value)
						}
						className="pl-9"
					/>
				</div>
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
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
				</div>
				<div className="space-x-2">
					<Button
						variant="neobrutalism"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						Previous
					</Button>
					<Button
						variant="neobrutalism"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
