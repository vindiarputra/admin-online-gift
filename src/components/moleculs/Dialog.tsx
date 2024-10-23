"use client";

import React from "react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Delete } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Dialog = ({ bannerId }: { bannerId: string }) => {
    const router = useRouter();
	const DeleteDialog = async (bannerId: string) => {
		const response = await fetch(`/api/banners/${bannerId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

        if (response.ok) {
            router.refresh();
		} else {
			console.error("Failed to delete banner");
		}
	};
	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Button
					variant="outline"
					className="w-32 p-1.5 rounded-sm mt-2 h-max justify-start border-none bg-red-600 text-white hover:bg-red-500 hover:text-white">
					<Delete className="mr-2.5 h-4 p-0" />
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your account and remove your
						data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={() => DeleteDialog(bannerId)}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default Dialog;
