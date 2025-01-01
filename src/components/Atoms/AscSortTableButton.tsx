
import {
	ChevronDown,
	ChevronUp,
	ChevronsUpDown,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

interface SortButtonProps {
	column: any;
	children: React.ReactNode;
}

export default function AscSortTableButton({ column, children }: SortButtonProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="h-8 data-[state=open]:bg-accent">
					<span>{children}</span>
					{column.getIsSorted() === "desc" ? (
						<ChevronDown className="ml-2 h-4 w-4" />
					) : column.getIsSorted() === "asc" ? (
						<ChevronUp className="ml-2 h-4 w-4" />
					) : (
						<ChevronsUpDown className="ml-2 h-4 w-4" />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
					<ChevronUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Ascending
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
					<ChevronDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Descending
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}


