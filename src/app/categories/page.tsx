

import CategoriesLayout from "@/components/Layouts/CategoriesLayout";
import { supabase } from "@/utils/supabase";


export default async function CategoriesPage() {
	async function fetchCategoriesData() {
		const { data, error } = await supabase.from("banners").select();
		if (error) {
			console.error("Error fetching banner data:", error);
			return [];
		}
		return data || [];
	}
	const categoriesData = await fetchCategoriesData();

	// 	if (newCategoryLabel.trim()) {
	// 		const newCategory: TableDataType["categories"][number] = {
	// 			id: "",
	// 			label: newCategoryLabel.trim(),
	// 		};
	// 		setCategories([...categories, newCategory]);
	// 		setNewCategoryLabel("");
	// 		setIsAddingCategory(false);
	// 	}
	// };

	// const deleteCategory = (id: string) => {
	// 	setCategories(categories.filter((category) => category.id !== id));
	// };
	return <CategoriesLayout categories={categoriesData} />;
}
