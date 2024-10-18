"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight, Trash2, Edit2, X } from "lucide-react";
import DataList from "@/components/organisms/DataList";
import ApiEndPoints from "@/components/organisms/ApiEndPoints";
import { TABLEDATA } from "@/constants";
import { TableDataType } from "@/types";
import Modal from "@/components/organisms/Modal";
import DropDown from "@/components/organisms/DropDown";
import Table from "@/components/organisms/DataList/DataLists";


export default function EnhancedCategoryManagement() {
	const [categories, setCategories] = useState<TableDataType["categories"]>(TABLEDATA.categories);
	const [isAddingCategory, setIsAddingCategory] = useState(false);
	const [newCategoryLabel, setNewCategoryLabel] = useState("");

	const addCategory = () => {
		if (newCategoryLabel.trim()) {
			const newCategory: TableDataType["categories"][number] = {
				id: "",
				label: newCategoryLabel.trim(),
			};
			setCategories([...categories, newCategory]);
			setNewCategoryLabel("");
			setIsAddingCategory(false);
		}
	};

	const deleteCategory = (id: string) => {
		setCategories(categories.filter((category) => category.id !== id));
	};
	return (
		<div className="p-6 bg-[#f2f2f2] min-h-screen font-mono">
			<div className="max-w-4xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-4xl font-bold text-black">Product ({categories.length})</h1>
					<button
						onClick={() => setIsAddingCategory(true)}
						className="flex items-center px-4 py-2 bg-[#FF69B4] text-black font-bold border-4 border-black rounded-none hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:translate-x-1">
						<Plus className="mr-2" /> Tambah Category
					</button>
				</div>

				{isAddingCategory && (
					<Modal
						setIsAddingCategory={setIsAddingCategory}
						setNewCategoryLabel={setNewCategoryLabel}
						addCategory={addCategory}
						newCategoryLabel={newCategoryLabel}
						children={<DropDown />}
					/>
				)}

				<Table />
				<ApiEndPoints />
			</div>
		</div>
	);
}
