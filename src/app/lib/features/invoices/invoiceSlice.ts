// In your invoiceSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiInstance from "@/app/api/axios";
import axios from "axios";
import { Invoice, Item } from "@/app/types/Invoice";

interface InvoiceState {
	currentInvoice: Invoice;
	status: "idle" | "loading" | "failed";
	error: string | undefined;
	validationErrors: Record<string, string>;
}

const initialState: InvoiceState = {
	currentInvoice: {
		id: "",
		createdAt: "",
		frontendId: "",
		paymentDue: "",
		description: "",
		paymentTerms: 0,
		clientName: "",
		clientEmail: "",
		status: "",
		senderAddress: { street: "", city: "", postCode: "", country: "" },
		clientAddress: { street: "", city: "", postCode: "", country: "" },
		items: [],
		total: 0,
		isReady: false,
	},
	status: "idle",
	error: undefined,
	validationErrors: {},
};

// Simulated POST request for demonstration
export const submitInvoice = createAsyncThunk(
	"invoice/submitInvoice",
	async (invoiceData: Invoice, { rejectWithValue }) => {
		try {
			const accessToken = localStorage.getItem("accessToken");
			const response = await apiInstance.post("/invoice/create", invoiceData, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			console.log(response.data);
			return response.data;
		} catch (err) {
			// Handle error more gracefully and return a custom error message or object
			if (axios.isAxiosError(err) && err.response) {
				return rejectWithValue(err.response.data);
			}
			return rejectWithValue("An unknown error occurred");
		}
	}
);

export const invoiceSlice = createSlice({
	name: "invoice",
	initialState,
	reducers: {
		addItem: (state) => {
			state.currentInvoice.items.push({
				name: "",
				quantity: 1,
				price: 0,
				total: 0,
			});
		},
		deleteItem: (state, action: PayloadAction<number>) => {
			state.currentInvoice.items.splice(action.payload, 1);
		},
		updateItem: (
			state,
			action: PayloadAction<{ index: number; item: Item }>
		) => {
			state.currentInvoice.items[action.payload.index] = action.payload.item;
		},
		resetInvoice: (state) => {
			state.currentInvoice = initialState.currentInvoice;
		},
		updateInvoice: (state, action: PayloadAction<Partial<Invoice>>) => {
			state.currentInvoice = { ...state.currentInvoice, ...action.payload };
		},
		setValidationErrors(state, action: PayloadAction<Record<string, string>>) {
			state.validationErrors = action.payload;
		},
		clearValidationErrors(state) {
			state.validationErrors = {};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(submitInvoice.pending, (state) => {
				state.status = "loading";
			})
			.addCase(submitInvoice.fulfilled, (state) => {
				state.status = "idle";
				// Reset the invoice data upon successful submission
				state.currentInvoice = initialState.currentInvoice;
			})
			.addCase(submitInvoice.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as string;
			});
	},
});

export const {
	addItem,
	deleteItem,
	updateItem,
	resetInvoice,
	updateInvoice,
	setValidationErrors,
	clearValidationErrors,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
