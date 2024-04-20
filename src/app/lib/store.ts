// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import invoiceReducer from "./features/invoices/invoiceSlice";
import feedbackReducer from "./features/feedback/feedbackSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		invoice: invoiceReducer,
		feedback: feedbackReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
