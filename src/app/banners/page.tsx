"use client"


import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight, Trash2, Edit2, X } from "lucide-react";
import ApiEndPoints from "@/components/organisms/ApiEndPoints";
import { TableDataType } from "@/types";
import { TABLEDATA } from "@/constants";
import Modal from "@/components/organisms/Modal";
import DataLists from "@/components/organisms/DataList/DataLists";
import { useRouter } from "next/navigation";

export default function EnhancedBannerManagement() {
	const router = useRouter()

	return (
		<div className="p-6 bg-[#f2f2f2] min-h-screen font-mono">
			<div className="max-w-4xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-4xl font-bold text-black">Banner </h1>
					<button
						onClick={() => router.push("/banners/new-banner")}
						className="flex items-center px-4 py-2 bg-[#FF69B4] text-black font-bold border-4 border-black rounded-none hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:translate-x-1">
						<Plus className="mr-2" /> Tambah Banner
					</button>
				</div>
				<DataLists />
				<ApiEndPoints />
			</div>
		</div>
	);
}
