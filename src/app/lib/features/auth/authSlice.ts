// store/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiInstance from "@/app/api/axios";
import axios from "axios";
import { LoginData } from "@/app/types/Auth";
import { RootState } from "../../store";
import {
	isTokenValid,
	refreshAccessToken,
	getNameIdentifierFromToken,
} from "@/app/helpers/refreshToken";

interface AuthState {
	isLoggedIn: boolean;
	loading: boolean;
	error: string;
	userId: string | null;
}

const initialState: AuthState = {
	isLoggedIn: false,
	loading: false,
	error: "",
	userId: null,
};

export const initialCheck = createAsyncThunk(
	"auth/initialCheck",
	async (_, { getState, dispatch }) => {
		const state = getState() as RootState;
		if (state.auth.isLoggedIn) {
			return true;
		}
		const token = localStorage.getItem("accessToken");
		if (token && isTokenValid(token)) {
			return true;
		} else {
			const refresh = localStorage.getItem("accessToken");
			if (refresh === null) {
				return false;
			}
			await refreshAccessToken();

			const newToken = localStorage.getItem("accessToken");
			if (newToken && isTokenValid(newToken)) {
				return true;
			}
		}
		return false;
	}
);

// Async thunk for login
export const login = createAsyncThunk(
	"auth/login",
	async ({ email, password }: LoginData, { rejectWithValue }) => {
		try {
			const response = await apiInstance.post("/auth/login", {
				email,
				password,
			});
			// Assuming response.data contains accessToken and refreshToken
			const { result } = response.data;
			const { accessToken, refreshToken } = result;

			// Securely store the tokens. Here's an example using localStorage.
			// Consider the security implications of where to store these.
			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("refreshToken", refreshToken);

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

export const register = createAsyncThunk(
	"auth/register",
	async (
		userData: {
			firstName: string;
			lastName: string;
			email: string;
			username: string;
			password: string;
		},
		{ rejectWithValue }
	) => {
		try {
			const response = await apiInstance.post("/auth/register", userData);
			// Assuming the response will have tokens if needed

			return response.data;
		} catch (err) {
			if (axios.isAxiosError(err) && err.response) {
				return rejectWithValue(
					err.response.data.message || "Failed to register."
				);
			}
			return rejectWithValue("An unknown error occurred");
		}
	}
);

// Slice definition
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// Action to log the user out
		logout: (state) => {
			state.isLoggedIn = false;
			// Clear tokens from storage on logout
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(initialCheck.fulfilled, (state, action) => {
				const token = localStorage.getItem("accessToken");
				state.isLoggedIn = action.payload;
				state.userId = getNameIdentifierFromToken(token);
				// You might want to update other parts of the state based on this check
			})
			.addCase(login.pending, (state) => {
				state.loading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.isLoggedIn = true;
				state.userId = action.payload.userId;
				// Optionally update state based on response
			})
			.addCase(login.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action.payload.message || "Failed to login";
			});
	},
});

// Export the reducer and actions
export const { logout } = authSlice.actions;
export default authSlice.reducer;
