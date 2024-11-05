"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "../ImageUpload";
import { supabase } from "@/utils/supabase";

const FormSchema = z.object({
	label: z.string().min(1, "Label is required"),
	isFeatured: z.boolean().optional(),
	isNew: z.boolean().optional(),
	onSale: z.boolean().optional(),
	stock: z.coerce.number().min(1, "Stock is required"),
	description: z.string().min(1, "Description is required"),
	price: z.coerce.number().min(1, "Price is required"),
	categoryId: z.string().min(1, "Category is required"),
	images_url: z.object({ url: z.string() }).array(),
});

export default function FormProduct() {
	const path = usePathname();
	const currentPath = path.split("/").pop();
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const [categoriesData, setCategoriesData] = useState<any[]>([]);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			isFeatured: false,
			isNew: false,
			onSale: false,
			label: "",
			stock: 0,
			description: "",
			price: 0,
			categoryId: "",
			images_url: [],
		},
	});

	async function onSubmit(values: z.infer<typeof FormSchema>) {
		setLoading(true);
		if (currentPath === "new-product") {
			await fetch("/api/products/new-product", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});
		} else {
			await fetch(`/api/products/${currentPath}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});
		}

		setLoading(false);
		router.push("/products");
	}

	useEffect(() => {
		async function fetchCategoriesData() {
			const { data, error } = await supabase.from("categories").select();

			if (error) {
				console.error("Error fetching categories data:", error);
			}
			setCategoriesData(data || []);
		}
		async function fetchProductData() {
			try {
				const res = await fetch(`/api/products/${currentPath}`);
				const data = await res.json();
				if (data?.length > 0) {
					form.reset({
						isFeatured: data[0]?.isFeatured || false,
						isNew: data[0]?.isNew || false,
						onSale: data[0]?.onSale || false,
						label: data[0]?.label || "",
						stock: data[0]?.stock || 0,
						description: data[0]?.description || "",
						price: data[0]?.price || 0,
						categoryId: data[0]?.categoryId || "",
						images_url: data[0]?.images_url || [],
					});
				}
			} catch (error) {
				console.error("Error fetching product data:", error);
			}
		}
		fetchCategoriesData();
		fetchProductData();
	}, [currentPath, form]);

	return (
		<div className="container mx-auto py-10">
			<Card className="max-w-xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">{currentPath === "new-product" ? "Create" : "Update"} a Product</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<div className="grid gap-6 grid-cols-3">
								<div className="col-span-2 space-y-6">
									<FormField
										control={form.control}
										name="label"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="font-semibold">Label</FormLabel>
												<FormControl>
													<Input placeholder="Product Name" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="categoryId"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="font-semibold">Category</FormLabel>
												<Select onValueChange={field.onChange} defaultValue={field.value}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select a Category" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{categoriesData?.map((category) => (
															<SelectItem key={category.id} value={category.id}>
																{category.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="col-span-1 space-y-6">
									<FormField
										control={form.control}
										name="price"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="font-semibold">Price</FormLabel>
												<FormControl>
													<Input type="number" {...field} min={1} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="stock"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="font-semibold">Stock</FormLabel>
												<FormControl>
													<Input type="number" {...field} min={1} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>

							<div className="flex w-full gap-4">
								<FormField
									control={form.control}
									name="isFeatured"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel>Featured</FormLabel>
												<FormDescription>Mark this product as featured.</FormDescription>
											</div>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="isNew"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel>New</FormLabel>
												<FormDescription>Mark this product as new.</FormDescription>
											</div>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="onSale"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel>On Sale</FormLabel>
												<FormDescription>Mark this product as on sale.</FormDescription>
											</div>
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Enter product description"
												{...field}
												className="resize-y"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="images_url"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base font-semibold">Image</FormLabel>
										<FormControl>
											<ImageUpload
												disabled={loading}
												onChange={(url) => {
													const currentImages = form.getValues("images_url");
													const newImage = { url: url };
													const updatedImages = [...currentImages, newImage];
													form.setValue("images_url", updatedImages, { shouldValidate: true });
												}}
												onRemove={(url) =>
													field.onChange([...field.value.filter((current) => current.url !== url)])
												}
												value={field.value.map((image) => image.url)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="w-full flex gap-4">
								<Button
									type="button"
									className="w-full bg-yellow-100 hover:bg-yellow-200"
									variant="outline"
									onClick={() => router.back()}>
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
