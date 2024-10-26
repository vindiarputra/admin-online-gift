"use client";

import useOrigin from "@/hooks/use-origin";
import { usePathname } from "next/navigation";
import React from "react";
import { Globe, FileText, PlusCircle, Edit3, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Pastikan path ini sesuai dengan lokasi komponen badge

const ApiEndPoints = () => {
	const path = usePathname();
	const currentPath = path.split("/")[path.split("/").length - 1];
	const origin = useOrigin();
	const allPath: string[] = ["banners", "categories", "products"];
	let currentPathMatchToApiEndpoint = "";

	const apiEndpointMap: Record<string, string> = {
		banners: "bannerId",
		categories: "categoryId",
		products: "productId",
	};

	if (allPath.includes(currentPath)) {
		currentPathMatchToApiEndpoint = apiEndpointMap[currentPath];
	}

	return (
		<div className="mt-8 flex flex-col space-y-6">
			<h2 className="text-3xl font-extrabold text-gray-800 mb-6">API Endpoints</h2>

			<div className="bg-white shadow-lg rounded-lg border border-gray-300 p-6">
				<div className="flex items-center mb-2">
					<Globe className="mr-2 text-blue-500" />
					<h3 className="text-xl font-semibold text-gray-700">GET ALL</h3>
					<Badge variant="outline" className="ml-2 bg-green-100 text-green-700">
						Public
					</Badge>
				</div>
				<code className="block bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 overflow-x-auto">
					{origin}/api/{currentPath}
				</code>
			</div>

			<div className="bg-white shadow-lg rounded-lg border border-gray-300 p-6">
				<div className="flex items-center mb-2">
					<FileText className="mr-2 text-green-500" />
					<h3 className="text-xl font-semibold text-gray-700">GET ONE</h3>
					<Badge variant="outline" className="ml-2 bg-green-100 text-green-700">
						Public
					</Badge>
				</div>
				<code className="block bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 overflow-x-auto">
					{origin}/api/{currentPath}/${`{${currentPathMatchToApiEndpoint}}`}
				</code>
			</div>

			<div className="bg-white shadow-lg rounded-lg border border-gray-300 p-6">
				<div className="flex items-center mb-2">
					<PlusCircle className="mr-2 text-purple-500" />
					<h3 className="text-xl font-semibold text-gray-700">POST</h3>
					<Badge variant="outline" className="ml-2 bg-red-100 text-red-700">
						Admin
					</Badge>
				</div>
				<code className="block bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 overflow-x-auto">
					{origin}/api/{currentPath}/${`{${currentPathMatchToApiEndpoint}}`}
				</code>
			</div>

			<div className="bg-white shadow-lg rounded-lg border border-gray-300 p-6">
				<div className="flex items-center mb-2">
					<Edit3 className="mr-2 text-yellow-500" />
					<h3 className="text-xl font-semibold text-gray-700">PATCH</h3>
					<Badge variant="outline" className="ml-2 bg-red-100 text-red-700">
						Admin
					</Badge>
				</div>
				<code className="block bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 overflow-x-auto">
					{origin}/api/{currentPath}/${`{${currentPathMatchToApiEndpoint}}`}
				</code>
			</div>

			<div className="bg-white shadow-lg rounded-lg border border-gray-300 p-6">
				<div className="flex items-center mb-2">
					<Trash2 className="mr-2 text-red-500" />
					<h3 className="text-xl font-semibold text-gray-700">DELETE</h3>
					<Badge variant="outline" className="ml-2 bg-red-100 text-red-700">
						Admin
					</Badge>
				</div>
				<code className="block bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 overflow-x-auto">
					{origin}/api/{currentPath}/${`{${currentPathMatchToApiEndpoint}}`}
				</code>
			</div>
		</div>
	);
};

export default ApiEndPoints;
