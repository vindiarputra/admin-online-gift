import React from "react";

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

export interface Product {
	id: string,
	label: string,
	price: string,
	categoryId: string,
	isFeatured: boolean,
	isNew: boolean,
	onSale: boolean,
	created_at: string,
}
