// In your invoiceSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Invoice, Item } from "@/app/types/Invoice";

interface InvoiceState {
	currentInvoice: Invoice;
	status: "idle" | "loading" | "failed";
	error: string | undefined;
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
	},
	status: "idle",
	error: undefined,
};

// Simulated POST request for demonstration
export const submitInvoice = createAsyncThunk(
	"invoice/submitInvoice",
	async (invoiceData: Invoice, { rejectWithValue }) => {
		try {
			// Replace with your actual API call
			const response = await axios.post("/api/invoices", invoiceData);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data);
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

export const { addItem, deleteItem, updateItem, resetInvoice, updateInvoice } =
	invoiceSlice.actions;

export default invoiceSlice.reducer;
