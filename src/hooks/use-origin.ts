"use client";

import { useEffect, useState } from "react";

const useOrigin = () => {
	const [origin, setOrigin] = useState("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			setOrigin(window.location.origin);
		}
	}, []);

	return origin;
};

export default useOrigin;
