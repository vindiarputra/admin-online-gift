import ProductsLayout from "@/components/Layouts/ProductsLayout";
import { supabase } from "@/utils/supabase";
import React from "react";

const ProductsPage = async () => {
	async function fetchProductsData() {
		const { data, error } = await supabase.from("products").select();
		if (error) {
			console.error("Error fetching categories data:", error);
			return [];
		}
		return data || [];
	}
	const productsData = await fetchProductsData();

	return <ProductsLayout products={productsData} />;
};

export default ProductsPage;
