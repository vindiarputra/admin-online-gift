"use client";

import CellActions from "@/components/moleculs/CellActions";
import { ColumnDef } from "@tanstack/react-table";

export type Banners = {
	id: string;
	label: string;
	image_url: string;
	// createAt: string;
};

export const columns: ColumnDef<Banners>[] = [
	{
		accessorKey: "id",
		header: "id",
	},
	{
		accessorKey: "label",
		header: "Label",
	},
	{
		accessorKey: "image_url",
		header: "ImageUrl",
	},
	{
		accessorKey: "actions",
		cell: ({ row }) => <CellActions data={row.original} />,
	},
];
