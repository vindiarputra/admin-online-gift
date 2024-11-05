"use client";

import { useEffect, useState } from "react";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import DeleteButtonImage from "../Atoms/DeleteButtonImage";

interface ImageUploadProps {
	disabled?: boolean;
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const onUpload = (result: any) => {
		onChange(result.info.secure_url);
	};

	if (!isMounted) {
		return null;
	}

	const getPublicIdFromUrls = (urls: string[]): string[] => {
		return urls.map((url) => {
			const parts = url.split("/");
			const publicIdWithExtension = parts[parts.length - 1];
			return publicIdWithExtension.split(".")[0]; // Menghapus ekstensi file
		});
	};
	const publicIds = getPublicIdFromUrls(value);

	return (
		<div>
			<div className="mb-4 flex items-center gap-4">
				{value.map((url) => (
					<div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
						<div className="z-10 absolute top-2 right-2">
                            <DeleteButtonImage public_id={publicIds[0]} publicUrl={url} onRemove={onRemove} />
						</div>
						<Image fill className="object-cover" alt="Image" src={url} />
					</div>
				))}
			</div>
			<CldUploadWidget onSuccess={onUpload} uploadPreset="npwjhumt" options={{ multiple: true }}>
				{({ open }) => {
					const onClick = () => {
						open();
					};
					return (
						<Button type="button" disabled={disabled} variant="secondary" onClick={onClick}>
							<ImagePlus className="h-4 w-4 mr-2" />
							Upload image
						</Button>
					);
				}}
			</CldUploadWidget>
		</div>
	);
};

export default ImageUpload;
