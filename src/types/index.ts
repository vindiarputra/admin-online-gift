import React from "react";

export interface TableDataType {
	[key: string]: {
		id: string;
		label: string;
		date?: string;
		actions?: React.ReactNode;
	}[];
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
	clerk_id: User;
	gross_amount: number;
	payment_type: string;
	bank: string;
	item: Item[];
}

export interface Banner {
	id: string;
	label: string;
	image_url: string;
	created_at: string;
	description: string;
}

export interface Category {
	id: string;
	created_at: string;
	bannerId: string;
	label: string;
}

export interface Product {
	id: string;
	created_at: string;
	label: string;
	description: string;
	isFeatured: boolean;
	isNew: boolean;
	onSale: boolean;
	price: number;
	stock: number;
	images_url: {
		url: string;
	}[];
	categoryId: string;
}

export interface TransactionItem {
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

export interface User {
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

export interface Transaction {
	id: string;
	created_at: string;
	clerk_id: User;
	gross_amount: number;
	payment_type: string;
	bank: string;
	item: TransactionItem[];
}

export interface CategoryWithProductCount extends Category {
	productCount: number;
}

