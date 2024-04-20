import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "@/app/lib/features/feedback/feedbackSlice";
import FeedbackForm from "./FeedbackForm";
import { RootState } from "@/app/lib/store";
import { useTheme } from "../context/themeContext";

const FeedbackModal = () => {
	const { isModalOpen } = useSelector((state: RootState) => state.feedback);
	const dispatch = useDispatch();
	const [hover, setHover] = useState(false);
	const { isLight } = useTheme();

	const closeModal = () => {
		dispatch(toggleModal());
		setHover(false);
	};

	if (!isModalOpen)
		return (
			<button
				onClick={() => dispatch(toggleModal())}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				className="fixed flex flex-row items-center bottom-4 right-4 p-3 bg-[#7C5DFA] text-white rounded-full shadow-lg hover:bg-[#6b5ac9] transition duration-150 ease-in-out"
				aria-label="Provide feedback"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<line x1="12" y1="5" x2="12" y2="19" />
					<line x1="5" y1="12" x2="19" y2="12" />
				</svg>
				{hover && <span>Give Feedback</span>}
			</button>
		);

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end items-end p-4"
			onClick={closeModal}
		>
			<div
				className={`${
					isLight ? "light" : "dark"
				} rounded-lg shadow-lg p-6 m-4 w-full max-w-sm`}
				onClick={(e) => e.stopPropagation()}
			>
				{isModalOpen && <FeedbackForm closeModal={closeModal} />}
			</div>
		</div>
	);
};

export default FeedbackModal;
