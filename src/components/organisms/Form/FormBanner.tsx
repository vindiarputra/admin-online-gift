"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ImageUpload from "../ImageUpload";
import { usePathname, useRouter } from "next/navigation";

const formSchema = z.object({
	label: z.string().min(1, "Label is required"),
	description: z.string().min(1, "Description is required"),
	images: z.string().min(1, "Image is required"),
});

export default function FormBanner() {
	const path = usePathname();
	const currentPath = path.split("/")[path.split("/").length - 1];
	const [bannerData, setBannerData] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			label: "",
			description: "",
			images: "",
		},
	});

	useEffect(() => {
		const fetchBannerData = async () => {
			try {
				const res = await fetch(`/api/banners/${currentPath}`);
				const data = await res.json();
				setBannerData(data);

				if (data.length > 0) {
					form.reset({
						label: data[0]?.label || "",
						description: data[0]?.description || "",
						images: data[0]?.image_url || "",
					});
				}
			} catch (error) {
				console.error("Error fetching banner data:", error);
			}
		};

		fetchBannerData();
	}, [currentPath, form]);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		const payload = {
			label: values.label,
			description: values.description,
			image_url: values.images,
		};

		if (bannerData && bannerData.length > 0) {
			await fetch(`/api/banners/${bannerData[0].id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});
		} else {
			await fetch(`/api/banners/new-banner`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});
		}
		setLoading(false);
		router.push("/banners");
	}

	return (
		<div className="container mx-auto py-10">
			<Card className="max-w-4xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">
						{" "}
						{currentPath === "new-banner" ? "Create" : "Update"} Banner{" "}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="label"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base font-semibold">Label</FormLabel>
										<FormControl>
											<Input placeholder="Enter Your Label Banner" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base font-semibold">Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Tell us a little bit about your banner"
												className="resize-y"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="images"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base font-semibold">Image</FormLabel>
										<FormControl>
											<ImageUpload
												disabled={loading}
												onChange={(url) => field.onChange(url)}
												onRemove={() => field.onChange("")}
												value={field.value ? [field.value] : []}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="w-full flex gap-4 ">
								<Button
									type="button"
									variant="neobrutalism"
									className="w-full bg-yellow-100 hover:bg-yellow-200"
									onClick={() => router.push("/banners")}>
									Cancel
								</Button>
								<Button type="submit" className="w-full" disabled={loading}>
									{loading ? "Submitting..." : "Submit"}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
