import { createSlice } from "@reduxjs/toolkit";

export const feedbackSlice = createSlice({
	name: "feedback",
	initialState: {
		isModalOpen: false,
	},
	reducers: {
		toggleModal: (state) => {
			state.isModalOpen = !state.isModalOpen;
		},
	},
});

export const { toggleModal } = feedbackSlice.actions;
export default feedbackSlice.reducer;
