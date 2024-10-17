import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type ModalProps = {
	setIsAddingCategory: React.Dispatch<React.SetStateAction<boolean>>;
	setNewCategoryLabel: React.Dispatch<React.SetStateAction<string>>;
	addCategory: () => void;
	newCategoryLabel: string;
	children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
	setIsAddingCategory,
	setNewCategoryLabel,
	addCategory,
	newCategoryLabel,
	children,
}) => {
	return (
		<div
			className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
			onClick={() => setIsAddingCategory(false)}>
			<div
				className="bg-white border-4 border-black p-6 max-w-md w-full relative"
				onClick={(e) => e.stopPropagation()}>
				<h2 className="text-2xl font-bold mb-4">Add New Category</h2>
				<Input
					type="text"
					placeholder="Category Label"
					value={newCategoryLabel}
					onChange={(e) => setNewCategoryLabel(e.target.value)}
					className="w-full px-4 py-2 bg-[#F0F0F0] border-4 border-black rounded-none focus:outline-none focus:ring-4 focus:ring-[#FF69B4] mb-4"
				/>
				{children}
				<div className="flex justify-end space-x-4 mt-4">
					<Button
						onClick={() => setIsAddingCategory(false)}
						className="px-4 py-2 bg-[#FF6347] text-black font-bold border-4 border-black rounded-none hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
						Cancel
					</Button>
					<Button
						onClick={addCategory}
						className="px-4 py-2 bg-[#90EE90] text-black font-bold border-4 border-black rounded-none hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
						Add
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
