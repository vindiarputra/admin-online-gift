import React from "react";
import { SignUp } from "@clerk/nextjs";

const page = (): React.ReactElement => {
	return (
		<div className="flex items-center justify-center h-screen">
			<SignUp />
		</div>
	);
};

export default page;
