import React, { useState } from "react";
import { useTheme } from "../context/themeContext";
import apiInstance from "../api/axios";
import axios from "axios";
import { useNotification } from "../context/NotificationContext";

type FeedbackFormProps = {
	closeModal: () => void;
};

type Feedback = {
	category: string;
	description: string;
	additionalInfo: string;
};

const FeedbackForm = ({ closeModal }: FeedbackFormProps) => {
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const [additionalInfo, setAdditionalInfo] = useState("");
	const { isLight } = useTheme();
	const { triggerNotification } = useNotification();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const feedbackData: Feedback = { category, description, additionalInfo };
		try {
			const accessToken = localStorage.getItem("accessToken");
			const response = await apiInstance.post("/feedback", feedbackData, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (response.status === 201) {
				triggerNotification("Feedback submitted successfully", "success");
			} else {
				triggerNotification("Unexpected successful response", "warning");
			}
		} catch (error) {
			triggerNotification("Error submitting feedback", "error");
			if (axios.isAxiosError(error) && error.response) {
				triggerNotification(
					`Feedback submission failed: ${error.response.status}`,
					"error"
				);
			}
		}

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
