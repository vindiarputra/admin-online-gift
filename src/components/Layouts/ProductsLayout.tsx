"use client";

import React, { FC } from "react";
import ApiEndPoints from "../organisms/ApiEndPoints";
import DataLists from "../organisms/DataList/DataLists";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

type ProductsLayoutProps = {
	products: any[];
};

const ProductsLayout: FC<ProductsLayoutProps> = ({ products }) => {
	const router = useRouter();

	return (
		<div className="p-6 bg-[#f2f2f2] min-h-screen font-mono">
			<div className="max-w-4xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-4xl font-bold text-black">
						Products{products?.length > +0 ? "(" + products.length + ")" : ""}
					</h1>
					<button
						onClick={() => router.push("/products/new-product")}
						className="flex items-center px-4 py-2 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-md">
						<Plus className="mr-2" /> Tambah Products
					</button>
				</div>
				<DataLists data={products} />
				<ApiEndPoints />
			</div>
		</div>
	);
};

export default ProductsLayout;
