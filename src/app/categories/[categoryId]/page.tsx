import { FormCategory } from "@/components/organisms/Form/FormCategory";
import { supabase } from "@/utils/supabase";
import React from "react";



const page = async () => {
  async function fetchCategoriesData() {
    const { data, error } = await supabase.from("categories").select()
    		if (error) {
					console.error("Error fetching categories data:", error);
					return [];
				}
    return data || [];
  }
  const categoriesData = await fetchCategoriesData();
	return <FormCategory categories={categoriesData} />;
};

export default page;
