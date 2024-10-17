import { TableDataType } from "@/types";

export const TABLEHEAD = {
	banners: {
		tableName: "banners",
		columns: ["id", "label", "date", "actions"],
	},

	categories: {
		tableName: "categories",
		columns: ["id", "label", "actions"],
	},
};

export const TABLEDATA: TableDataType = {
    banners: [
        { id: "stringacak", label: "Summer Sale", date: "2023-06-01"},
        { id: "stringacak2", label: "New Collection", date: "2023-07-15" },
        { id: "stringacak3", label: "Holiday Special", date: "2023-12-01" },
    ],

    categories: [
        { id: "stringacak", label: "Summer Sale" },
        { id: "stringacak2", label: "New Collection" },
        { id: "stringacak3", label: "Holiday Special" },
    ],
};
