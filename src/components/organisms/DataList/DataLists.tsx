"use client";

import { Category } from "@/types";
import { columnsBanners, columnsCategories } from "./Columns";
import { DataTable } from "./DataTable";
import { usePathname } from "next/navigation";
import moment from "moment";

interface DataListsProps {
	data?: any[];
}

export default function DataLists({ data = [] }: DataListsProps) {
	const path = usePathname();
	console.log(data)
	const currentPath = path.split("/").pop() ?? "";

	const columnsMap: Record<string, any> = {
		categories: columnsCategories,
		banners: columnsBanners,
	} ;

	const formattedData =
		currentPath === "categories"
			? data.map((item) => ({
					id: item.id,
					label: item.label,
					image_url: item.bannerId.image_url,
					created_at: moment(item.created_at).format("MMMM Do YYYY"),
			  }))
			: data;

	return (
		<div className="container mx-auto">
			<DataTable columns={columnsMap[currentPath] || columnsCategories} data={formattedData} />
		</div>
	);
}
