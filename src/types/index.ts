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

export interface ClerkUser {
	id: string;
	tlp: number;
	name: string;
	email: string;
	address: string;
	clerk_id: string;
	imageUrl: string;
	created_at: string;
	postal_code: number;
}

export interface Item {
	id: string;
	created_at: string;
	label: string;
	description: string;
	price: number;
	isFeatured: boolean;
	isNew: boolean;
	onSale: boolean;
	quantity: number;
	image: string;
	productId: string;
	clerk_id: string;
}

export interface Order {
	id: string;
	created_at: string;
	clerk_id: ClerkUser;
	gross_amount: number;
	payment_type: string;
	bank: string;
	item: Item[];
}

