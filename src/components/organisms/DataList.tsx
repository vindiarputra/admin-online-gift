"use client";

import { TABLEDATA, TABLEHEAD } from "@/constants";
import { ChevronLeft, ChevronRight, Edit2, Trash2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type DataListProps = {
	datas: any[];
	onDelete: (id: string) => void;
};

const DataList: React.FC<DataListProps> = ({ datas, onDelete }) => {
	const [filter, setFilter] = useState("");
	const filteredDatas = datas.filter((data: { label: string }) =>
		data.label.toLowerCase().includes(filter.toLowerCase())
	);

	const path = usePathname();
	const currentPath = path.split("/")[path.split("/").length - 1];
	const getTableColumns = () => {
		if (currentPath === TABLEHEAD.banners.tableName) {
			return TABLEHEAD.banners.columns;
		} else if (currentPath === TABLEHEAD.categories.tableName) {
			return TABLEHEAD.categories.columns;
		}
	};

	const currentColumns = getTableColumns();
	const currentTableDatas = filteredDatas;

	return (
		<>
			<div className="mb-6 relative">
				<Input
					type="text"
					placeholder="Filter by label"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className="w-96"
				/>
				{filter && (
					<Button
						variant="ghost"
						onClick={() => setFilter("")}
						className="absolute right-4 top-1/2 transform -translate-y-1/2 p-0">
						<X size={20} />
					</Button>
				)}
			</div>

			<div className="bg-white border-4 border-black p-4 mb-6">
				<Table>
					<TableHeader>
						<TableRow>
							{currentColumns &&
								currentColumns.map((col) => <TableHead key={col}>{col}</TableHead>)}
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredDatas.length === 0 ? (
							<TableRow>
								<TableCell colSpan={3} className="text-center p-4 font-bold">
									No results.
								</TableCell>
							</TableRow>
						) : (
							currentTableDatas.map((data) => (
								<TableRow key={data.id} className="hover:bg-[#F0F0F0]">
									<TableCell>{data.id}</TableCell>
									<TableCell>{data.label}</TableCell>
									{data.date && <TableCell>{data.date}</TableCell>}
									<TableCell>
										<Button
											variant="outline"
											className="mr-2 p-1 bg-[#90EE90] border-2 border-black">
											<Edit2 size={16} />
										</Button>
										<Button
											variant="outline"
											onClick={() => onDelete(data.id)}
											className="p-1 bg-[#FF6347] border-2 border-black">
											<Trash2 size={16} />
										</Button>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex justify-between items-center">
				<span className="font-bold">Page 1 of 1</span>
				<div>
					<Button variant="outline" className="mr-2">
						<ChevronLeft size={16} />
					</Button>
					<Button variant="outline">
						<ChevronRight size={16} />
					</Button>
				</div>
			</div>
		</>
	);
};

export default DataList;
