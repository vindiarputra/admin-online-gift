import React from "react";

type TableHeadType = {
	tableName: string;
	columns: string[];
};
export interface TableDataType {
	[key: string]: {
		id: string;
		label: string;
		date?: string;
		actions?: React.ReactNode;
	}[];
}

export interface Banner {
	id: string,
	label: string,
	image_url: string,
	description: string,
	created_at: string
}

export interface Category {
	id: string,
	label: string,
	created_at: string
}
