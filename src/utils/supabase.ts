import { createClient } from "@supabase/supabase-js";
import { UUID } from "crypto";

export const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL as string,
	process.env.NEXT_PUBLIC_SUPABASE_KEY as string
);


export interface Banner {
	label: string;
	description: string
}

export interface Category {
	categoryName: string;
	categoryNameId: string;
	categoryItems: {
		itemName: string;
		itemId: string;
	};
}

export interface Products {
	id: string;
	name: string;
	price: number;
	description: string;
	categoryId: string;
	categoryItemId: string;
	images: string[];
	stock: number;
	isNew?: boolean;
	onSale?: boolean;
	isFeatured: boolean;
	createdAt: string;
	updatedAt: string;
}