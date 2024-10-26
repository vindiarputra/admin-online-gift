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
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ImageUpload from "../ImageUpload";
import { usePathname, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
	label: z.string().min(1, "Label is required"),
	description: z.string().min(1, "Description is required"),
	images: z.string().min(1, "Image is required"),
});

const FormBanner = () => {
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

	// Fetch banner data
	useEffect(() => {
		const fetchBannerData = async () => {
			try {
				const res = await fetch(`/api/banners/${currentPath}`);
				const data = await res.json();
				setBannerData(data);

				// Set form default values based on fetched data
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

		if (bannerData.length > 0) {
			await fetch(`/api/banners/${bannerData[0].id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});
			setLoading(false);
			router.push("/banners");
		} else {
			await fetch(`/api/banners/new-banner`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});
			setLoading(false);
			router.push("/banners");
		}
	}

	return (
		<div className="px-4 mt-8 md:px-16">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="inline-flex w-full mb-4 gap-4">
						<FormField
							control={form.control}
							name="label"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="tracking-tight font-semibold text-2xl">Label</FormLabel>
									<FormControl>
										<Input placeholder="Enter Your Label Banner" className="w-max" {...field} />
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
									<FormLabel className="tracking-tight font-semibold text-2xl">
										Description
									</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Tell us a little bit about yourself"
											className="resize"
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
									<FormLabel className="tracking-tight font-semibold text-2xl">Image</FormLabel>
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
					</div>
					<Button type="submit" disabled={loading}>
						{loading ? "Submitting..." : "Submit"}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default FormBanner;
