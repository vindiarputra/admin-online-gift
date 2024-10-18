"use client";

import { useState } from "react";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { SignedOut, useClerk, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";


export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const { signOut } = useClerk();
	const { isSignedIn, user, isLoaded } = useUser();

	const menuItems = [
		{
			name: "Dashboard",
			href: "/",
		},
		{
			name: "Banners",
			href: "/banners",
		},
		{
			name: "Categories",
			href: "/categories",
		},

		{
			name: "Products",
			href: "/products",
		},
	];



	return (
		<nav className="bg-[#f2f2f2] border-b-2 border-black">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="flex-shrink-0">
						<span className="text-black text-2xl font-bold">AdminLogo</span>
					</div>

					{/* Desktop Menu */}
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							{menuItems.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className="text-black hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] px-3 py-2 rounded-md text-sm font-medium border-2 border-black">
									{item.name}
								</a>
							))}
						</div>
					</div>

					{/* User Menu */}
					<div className="hidden md:block">
						<div className="ml-4 flex items-center md:ml-6">
							<div className="relative">
								<button
									onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
									className="flex items-center text-black hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] px-3 py-2 rounded-md text-sm font-medium border-2 border-black">
									<UserButton />
									<span>Admin User</span>
									<ChevronDown className="ml-2 h-4 w-4" />
								</button>
								{isUserMenuOpen && (
									<div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white border-2 border-black">
										<div className="py-1">
											<Button variant={"outline"} className="w-full   justify-start">
												<User className="mr-3 h-4 w-4" />
												Profile
											</Button>
											<Button
												variant={"outline"}
												className="w-full   justify-start"
												onClick={() => signOut({ redirectUrl: "/sign-in" })}>
												<LogOut className="mr-3 h-4 w-4" />
												Sign out
											</Button>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] border-2 border-black">
							<span className="sr-only">Open main menu</span>
							{isMenuOpen ? (
								<X className="block h-6 w-6" aria-hidden="true" />
							) : (
								<Menu className="block h-6 w-6" aria-hidden="true" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="md:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
						{["Dashboard", "Users", "Settings"].map((item) => (
							<a
								key={item}
								href="#"
								className="text-black hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] block px-3 py-2 rounded-md text-base font-medium border-2 border-black">
								{item}
							</a>
						))}
					</div>
					<div className="pt-4 pb-3 border-t border-black">
						<div className="flex items-center px-5">
							<div className="flex-shrink-0">
								<User className="h-10 w-10 text-black" />
							</div>
							<div className="ml-3">
								<div className="text-base font-medium text-black">Admin User</div>
								<div className="text-sm font-medium text-black">admin@example.com</div>
							</div>
						</div>
						<div className="mt-3 px-2 space-y-1">
							<Button variant={"outline"} className="w-full justify-start">
								Profile
							</Button>
							<SignedOut>
								<Button
									variant={"outline"}
									className="w-full justify-start"
									onClick={() => signOut({ redirectUrl: "/sign-in" })}>
									Sign out
								</Button>
							</SignedOut>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}
