"use client";

import React, { FC } from "react";
import ApiEndPoints from "../organisms/ApiEndPoints";
import DataLists from "../organisms/DataList/DataLists";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

type CategoriesLayoutProps = {
	categories: any[];
};

const CategoriesLayout: FC<CategoriesLayoutProps> = ({ categories }) => {
    const router = useRouter();
    
	return (
		<div className="p-6 bg-[#f2f2f2] min-h-screen font-mono">
			<div className="max-w-4xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-4xl font-bold text-black">
						Categories{categories?.length > +0 ? "(" + categories.length + ")" : ""}
					</h1>
					<button
						onClick={() => router.push("/categories/new-category")}
						className="flex items-center px-4 py-2 bg-[#FF69B4] text-black font-bold border-4 border-black rounded-none hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:translate-x-1">
						<Plus className="mr-2" /> Tambah Category
					</button>
				</div>
                <DataLists data={categories} />
				<ApiEndPoints />
			</div>
		</div>
	);
};

export default CategoriesLayout;
