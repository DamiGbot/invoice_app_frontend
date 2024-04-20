import React, { useState } from "react";
import { useTheme } from "../context/themeContext";

type FeedbackFormProps = {
	closeModal: () => void;
};

const FeedbackForm = ({ closeModal }: FeedbackFormProps) => {
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const [additionalInfo, setAdditionalInfo] = useState("");
	const { isLight } = useTheme();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({ category, description, additionalInfo });
		closeModal();
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<select
				required
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				className={`w-full rounded-[4px]  border pl-[19px] py-[16px] font-bold text-[1p6x] tracking-[-0.25px] leading-[15px] ${
					isLight
						? "text-[#0C0E16] border-[#DFE3FA]"
						: "bg-[#1E2139] border-[#252945] text-[#fff]"
				}`}
			>
				<option value="">Select Category</option>
				<option value="bug">Bug Report</option>
				<option value="suggestion">Suggestion</option>
			</select>

			<textarea
				required
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				className={`w-full rounded-[4px]  border pl-[19px] py-[16px] font-bold text-[1p6x] tracking-[-0.25px] leading-[15px] ${
					isLight
						? "text-[#0C0E16] border-[#DFE3FA]"
						: "bg-[#1E2139] border-[#252945] text-[#fff]"
				}`}
				rows={4}
			/>

			<textarea
				placeholder="Additional Info (optional)"
				value={additionalInfo}
				onChange={(e) => setAdditionalInfo(e.target.value)}
				className={`w-full rounded-[4px]  border pl-[19px] py-[16px] font-bold text-[16px] tracking-[-0.25px] leading-[15px] ${
					isLight
						? "text-[#0C0E16] border-[#DFE3FA]"
						: "bg-[#1E2139] border-[#252945] text-[#fff]"
				}`}
				rows={2}
			/>

			<button
				type="submit"
				className="pt-[17px] pb-[16px]  rounded-full font-bold text-[16px] tracking-[-0.25px] leading-[15px] bounce-effect bg-[#7C5DFA] text-[#FFFFFF] px-[16px]"
			>
				Submit Feedback
			</button>
		</form>
	);
};

export default FeedbackForm;
