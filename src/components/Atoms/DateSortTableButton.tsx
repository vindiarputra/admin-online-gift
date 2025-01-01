import {

	ChevronsUpDown,

	Clock,
	ClockIcon as ClockRewind,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

export default function DateSortTableButton({ column }: { column: any }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
					<span>Order Date</span>
					{column.getIsSorted() === "desc" ? (
						<Clock className="ml-2 h-4 w-4" />
					) : column.getIsSorted() === "asc" ? (
						<ClockRewind className="ml-2 h-4 w-4" />
					) : (
						<ChevronsUpDown className="ml-2 h-4 w-4" />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
					<Clock className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Newest
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
					<ClockRewind className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Oldest
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
