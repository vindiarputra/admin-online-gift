import React, { FC } from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import crypto from "crypto";

type DeleteButtonImageProps = {
	public_id: string;
    publicUrl: string;
	onRemove: (value: string) => void;
};

const generateSHA1 = (data: string) => {
	const hash = crypto.createHash("sha1");
	hash.update(data);
	return hash.digest("hex");
};

const generateSignature = (publicId: string, apiSecret: string) => {
	const timestamp = new Date().getTime();
	return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

const DeleteButtonImage: FC<DeleteButtonImageProps> = ({ public_id, onRemove, publicUrl }) => {
	const handleDeleteImage = async (publicId: string) => {
		const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
		const timestamp = new Date().getTime();
		const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
		const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!!;
		console.log(apiSecret);

		const signature = generateSHA1(generateSignature(publicId, apiSecret));
		const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					public_id: publicId,
					signature: signature,
					api_key: apiKey,
					timestamp: timestamp,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to delete image");
			}

			const result = await response.json();
			onRemove(publicUrl);
			console.log("Image deleted:", result);
		} catch (error) {
			console.error("Something went wrong, please try again later.", error);
		}
	};

	return (
		<Button
			type="button"
			onClick={() => handleDeleteImage(public_id)}
			variant="destructive"
			size="icon">
			<Trash className="h-4 w-4" />
		</Button>
	);
};

export default DeleteButtonImage;
