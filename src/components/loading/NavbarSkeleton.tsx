
import React from "react";
import { Menu } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function NavbarSkeleton() {
	return (
		<nav className="bg-background border-b">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo Skeleton */}
					<div className="flex-shrink-0">
						<Skeleton className="h-8 w-32" />
					</div>

					{/* Desktop Menu Skeleton */}
					<div className="hidden md:flex items-center space-x-4">
						{[1, 2, 3, 4].map((item) => (
							<Skeleton key={item} className="h-8 w-24" />
						))}
					</div>

					{/* User Button Skeleton */}
					<div className="hidden md:flex items-center">
						<Skeleton className="h-10 w-10 rounded-full" />
					</div>

					{/* Mobile Menu Button Skeleton */}
					<div className="md:hidden">
						<Button variant="outline" size="icon">
							<Menu className="h-6 w-6" />
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile Menu Skeleton (always hidden in skeleton) */}
			<div className="md:hidden hidden">
				<div className="px-2 pt-2 pb-3 space-y-1">
					{[1, 2, 3, 4].map((item) => (
						<Skeleton key={item} className="h-10 w-full" />
					))}
				</div>
				<div className="pt-4 pb-3 border-t border-border">
					<div className="flex items-center px-5">
						<Skeleton className="h-10 w-10 rounded-full" />
						<div className="ml-3 space-y-1">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-3 w-32" />
						</div>
					</div>
					<div className="mt-3 px-2 space-y-1">
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
					</div>
				</div>
			</div>
		</nav>
	);
}
