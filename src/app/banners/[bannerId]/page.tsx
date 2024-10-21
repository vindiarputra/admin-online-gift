import FormBanner from "@/components/organisms/Form/FormBanner";
import React, { useEffect } from "react";

const page = (params: { bannerId: string }) => {
	return (
		<div className="flex flex-col gap-2">
			<FormBanner bannerId={params.bannerId} />
		</div>
	);
};

export default page;
