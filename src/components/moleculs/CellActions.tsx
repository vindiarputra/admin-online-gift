"use client";

import { Delete, Ellipsis, LucideFileEdit } from "lucide-react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import Dialog from "./Dialog";

const CellActions = ({ data }: { data: any }) => {
	const router = useRouter();
	const path = usePathname();
	const currentPath = path.split("/")[path.split("/").length - 1];
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0 ml-2.5">
					<Ellipsis />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className=" cursor-pointer"
					onClick={() => router.push(`/${currentPath}/${data.id}`)}>
					<LucideFileEdit className="mr-2 h-4 w-4" />
					Update
				</DropdownMenuItem>

				<Dialog dataId={data.id} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default CellActions;
