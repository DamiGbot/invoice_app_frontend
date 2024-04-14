import apiInstance from "../api/axios";
import axios from "axios";

// Token storage utility functions
const getToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");
const saveToken = (token: string) => localStorage.setItem("accessToken", token);

export const refreshAccessToken = async () => {
	try {
		const refreshToken = getRefreshToken();
		const accessToken = getToken();

		const response = await apiInstance.post("/auth/refresh-token", {
			accessToken,
			refreshToken,
		});

		const { result } = response.data;

		// Securely store the tokens. Here's an example using localStorage.
		// Consider the security implications of where to store these.
		localStorage.setItem("accessToken", result.accessToken);
		localStorage.setItem("refreshToken", result.refreshToken);

		return response.data;
	} catch (error) {
		console.error("Error refreshing access token:", error);

		if (axios.isAxiosError(error) && error.response) {
			return error.response.data;
		}
		return error;
	}
};

const decodeToken = (token: string) => {
	try {
		if (token == null) {
			throw new Error("token is undefined");
		}
		const base64Url = token.split(".")[1]; // Get payload part
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
				.join("")
		);

		return JSON.parse(jsonPayload);
	} catch (error) {
		console.error("Error decoding token:", error);
		return null;
	}
};

export const getNameIdentifierFromToken = (token: string): string | null => {
	const payload = decodeToken(token);
	if (payload) {
		// Access the nameidentifier using its full URI
		const nameIdentifier = payload[process.env.NEXT_PUBLIC_NAME_IDENTIFIER];
		return nameIdentifier;
	}
	return null;
};

export const isTokenValid = (token: string) => {
	const payload = decodeToken(token);
	const expectedIssuer = process.env.NEXT_PUBLIC_ISSUER_VAL;

	if (!payload) return false;

	const isIssuerMatch = payload.iss === expectedIssuer;
	return isIssuerMatch;
};

export const isTokenExpired = (token: string) => {
	const payload = decodeToken(token);
	if (!payload) return true;

	const currentTime = Date.now() / 1000;
	return payload.exp < currentTime;
};

const expectedIssuer = "https://your.auth.server";

// Call this function on app load or when you need to ensure the user is authenticated
