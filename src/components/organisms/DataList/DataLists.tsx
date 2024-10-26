"use client";

import { Category } from "@/types";
import { columnsBanners, columnsCategories } from "./Columns";
import { DataTable } from "./DataTable";
import { usePathname } from "next/navigation";
import moment from "moment";

interface DataListsProps {
	data: any[];
}

export default function DataLists({ data }: DataListsProps) {
	const path = usePathname();
	const currentPath = path.split("/").pop();

	let formattedData;

	if (currentPath === "categories") {
		const dataCategories: Category[] = data.map((item) => ({
			id: item.id,
			label: item.label,
			image_url: item.image_url,
			created_at: moment(item.created_at).format("MMMM Do YYYY"),
		}));
		formattedData = dataCategories;
	} else {
		formattedData = data; // Gunakan data asli jika bukan kategori
	}

	return (
		<div className="container mx-auto">
			<DataTable columns={columnsCategories} data={formattedData} />
		</div>
	);
}
