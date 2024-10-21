import useOrigin from "@/hooks/use-origin";
import { usePathname } from "next/navigation";
import React from "react";

const ApiEndPoints = () => {
	const path = usePathname();
	const currentPath = path.split("/")[path.split("/").length - 1];
	const origin = useOrigin()
	

	return (
		<div className="mt-8">
			<h2 className="text-2xl font-bold mb-4">API</h2>
			<div className="bg-white border-4 border-black p-4">
				<h3 className="font-bold mb-2">GET</h3>
				<code className="block bg-[#F0F0F0] p-2 border-2 border-black overflow-x-auto">
					{origin}/api/{currentPath}
				</code>
			</div>
		</div>
	);
};

export default ApiEndPoints;
