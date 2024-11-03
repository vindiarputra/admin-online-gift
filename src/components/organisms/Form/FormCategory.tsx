"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FormSchema = z.object({
	label: z.string().min(1, "Label is required"),
	bannerId: z.string().min(1, "Select Banner is required"),
});

export function FormCategory() {
	const path = usePathname();
	const currentPath = path.split("/").pop();
	const [categoriesData, setCategoriesData] = useState<any[]>([]);
	const [bannersData, setBannersData] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});
	console.log(categoriesData);

	async function onSubmit(values: z.infer<typeof FormSchema>) {
		setLoading(true);
		const payload = {
			label: values.label,
			bannerId: values.bannerId,
		};

		const endpoint =
			categoriesData.length > 0
				? `/api/categories/${categoriesData[0].id}`
				: `/api/categories/new-banner`;
		const method = categoriesData.length > 0 ? "PATCH" : "POST";

		await fetch(endpoint, {
			method,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});

		setLoading(false);
		router.push("/categories");
	}

	useEffect(() => {
		async function fetchBannersData() {
			const { data, error } = await supabase.from("banners").select("id, label");
			if (error) {
				console.error("Error fetching banners data:", error);
			} else {
				setBannersData(data || []);
			}
		}

		async function fetchCategoriesData() {
			try {
				const res = await fetch(`/api/categories/${currentPath}`);
				const data = await res.json();
				setCategoriesData(data);

				if (data.length > 0) {
					form.reset({
						label: data[0].label || "",
						bannerId: data[0].bannerId || "",
					});
				}
			} catch (error) {
				console.error("Error fetching category data:", error);
			}
		}

		fetchBannersData();
		fetchCategoriesData();
	}, [currentPath, form]);

	return (
		<div className="container mx-auto py-10">
			<Card className="max-w-md mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">
						{categoriesData.length > 0 ? "Edit Category" : "Create a Category"}
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
										<FormLabel className="font-semibold">Label</FormLabel>
										<FormControl>
											<Input placeholder="Enter Your Label Category" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="bannerId"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">Banner</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Choose Banner" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{bannersData.map((item) => (
													<SelectItem key={item.id} value={item.id}>
														{item.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="w-full flex gap-4" >
								<Button type="button" className="w-full bg-yellow-100 hover:bg-yellow-200" variant={"neobrutalism"} onClick={() => router.back()}>
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
