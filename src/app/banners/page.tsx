"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight, Trash2, Edit2, X } from "lucide-react";
import ApiEndPoints from "@/components/organisms/ApiEndPoints";
import { TableDataType } from "@/types";
import { TABLEDATA } from "@/constants";
import Modal from "@/components/organisms/Modal";
import DataLists from "@/components/organisms/DataList/DataLists";

export default function EnhancedBannerManagement() {
	const [banners, setBanners] = useState<TableDataType["banners"]>(TABLEDATA.banners);
	const [isAddingBanner, setIsAddingBanner] = useState(false);
	const [newBannerLabel, setNewBannerLabel] = useState("");

	const addBanner = () => {
		if (newBannerLabel.trim()) {
			const newBanner: TableDataType["banners"][number] = {
				label: newBannerLabel.trim(),
				date: new Date().toISOString().split("T")[0],
				id: "",
			};
			setBanners([...banners, newBanner]);
			setNewBannerLabel("");
			setIsAddingBanner(false);
		}
	};

	const deleteBanner = (id: string) => {
		setBanners(banners.filter((banner) => banner.id !== id));
	};

	return (
		<div className="p-6 bg-[#f2f2f2] min-h-screen font-mono">
			<div className="max-w-4xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-4xl font-bold text-black">Banner ({banners.length})</h1>
					<button
						onClick={() => setIsAddingBanner(true)}
						className="flex items-center px-4 py-2 bg-[#FF69B4] text-black font-bold border-4 border-black rounded-none hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:translate-x-1">
						<Plus className="mr-2" /> Tambah Banner
					</button>
				</div>

				{isAddingBanner && (
					<Modal
						setIsAddingCategory={setIsAddingBanner}
						setNewCategoryLabel={setNewBannerLabel}
						addCategory={addBanner}
						newCategoryLabel={newBannerLabel}
					/>
				)}

				<DataLists/>
				<ApiEndPoints />
			</div>
		</div>
	);
}
