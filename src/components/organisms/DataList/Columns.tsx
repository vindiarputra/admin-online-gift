"use client";

import CellActions from "@/components/moleculs/CellActions";
import { Banner, Category, Product } from "@/types";
import { ColumnDef } from "@tanstack/react-table";


export const columnsBanners: ColumnDef<Banner>[] = [
	{
		accessorKey: "id",
		header: "id",
	},
	{
		accessorKey: "label",
		header: "Label",
	},
	{
		accessorKey: "description",
		header: "Description",
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

export const columnsCategories: ColumnDef<Category>[] = [
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
		header: "Banner URL",
	},
	{
		accessorKey: "created_at",
		header: "Created At",
	},
	{
		accessorKey: "actions",
		cell: ({ row }) => <CellActions data={row.original} />,
	},
];

export const columnsProducts: ColumnDef<Product>[] = [
	{
		accessorKey: "id",
		header: "id",
	},
	{
		accessorKey: "label",
		header: "Label",
	},
	{
		accessorKey: "price",
		header: "Price",
	},
	{
		accessorKey: "isFeatured",
		header: "Is Featured",
	},
	{
		accessorKey: "isNew",
		header: "Is New",
	},
	{
		accessorKey: "onSale",
		header: "On Sale",
	},
	{
		accessorKey: "created_at",
		header: "Created At",
	},
	{
		accessorKey: "actions",
		cell: ({ row }) => <CellActions data={row.original} />,
	}
];
