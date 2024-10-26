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
import { Category } from "@/types";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type FormCategoryProps = {
	categories: Category[];
};

const FormSchema = z.object({
	label: z.string().min(1, "Label is required"),
	bannerId: z.string().min(1, "select Banner is required"),
});

export function FormCategory({ categories }: FormCategoryProps) {
	const path = usePathname();
	const [categoriesData, setCategoriesData] = useState<any>([]);
    const currentPath = path.split("/")[path.split("/").length - 1];
    const [loading, setLoading] = useState(false)
    const router = useRouter()


	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	async function onSubmit(values: z.infer<typeof FormSchema>) {
		setLoading(true);
		const payload = {
			label: values.label,
            bannerId: values.bannerId
		};

		if (categoriesData.length > 0) {
			await fetch(`/api/categories/${categoriesData[0].id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});
			setLoading(false);
			router.push("/categories");
		} else {
			await fetch(`/api/categories/new-banner`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});
			setLoading(false);
			router.push("/categories");
		}
	}

	useEffect(() => {
		const fetchCategoriesData = async () => {
			try {
				const res = await fetch(`/api/categories/${currentPath}`);
                const data = await res.json();
                console.log(data)
				setCategoriesData(data);

				// Set form default values based on fetched data
				if (data.length > 0) {
					form.reset({
						label: data[0]?.label || "",
						bannerId: data[0]?.bannerId || "",
					});
                } else {
                    return null
                }
			} catch (error) {
				console.error("Error fetching banner data:", error);
			}
		};

		fetchCategoriesData();
	}, [currentPath, form]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
			<div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
				<h2 className="text-2xl font-bold text-center mb-6">Create a Category</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="label"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">Label</FormLabel>
									<FormControl>
										<Input placeholder="Enter Your Label Category" className="w-full" {...field} />
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
									<FormLabel className="tracking-tight font-semibold">Banner</FormLabel>
									<Select
										onValueChange={(value) => field.onChange(value)}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Choose Banner" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((item) => (
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
						<Button
							type="submit"
							className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-200">
							Submit
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
