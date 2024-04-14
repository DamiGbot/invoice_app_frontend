"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import {
	isTokenExpired,
	isTokenValid,
	refreshAccessToken,
} from "../helpers/refreshToken";
import { useRouter } from "next/navigation";
import { useTheme } from "../context/themeContext";
// import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

const HomePage: React.FC = () => {
	const router = useRouter();
	const { isLight } = useTheme();

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken");

		// Optionally, add a function to verify the token's validity with your backend
		const verifyAndRefreshToken = async () => {
			const token = localStorage.getItem("accessToken") as string;
			const isValidIssuer = isTokenValid(token);

			if (!isValidIssuer) {
				console.log("Invalid issuer. Please Login...");
				return false;
			}

			if (isTokenExpired(token)) {
				console.log("Token expired. Refreshing...");
				await refreshAccessToken();
				return true;
			}
		};

		const checkAccess = async () => {
			if (accessToken && (await verifyAndRefreshToken())) {
				router.replace("/invoices");
			}
		};

		checkAccess();
	}, [router]);

	const fontColor = isLight ? "text-[#0C0E16] " : "text-[#fff]";

	return (
		<div
			className={`flex flex-col items-center justify-center min-h-screen ${
				isLight && "bg-gray-100"
			} text-gray-800`}
		>
			<h1 className={`text-4xl font-bold mb-4 ${fontColor}`}>
				Welcome to InvoiceApp
			</h1>
			<p className={`text-center mb-8 max-w-md ${fontColor}`}>
				InvoiceApp is a comprehensive invoicing solution designed for
				freelancers and small businesses. Manage your invoices, track payments,
				and ensure your billing is seamless and efficient.
			</p>
			<div className="flex flex-wrap justify-center gap-4">
				<Link
					href="/auth/Login"
					className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
				>
					Login
				</Link>
				<Link
					href="/auth/Register"
					className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-150 ease-in-out"
				>
					Register
				</Link>
			</div>
			{/* <div className="mt-12">
				<h2 className="text-3xl font-semibold mb-3">Features</h2>
				<ul className="list-disc list-inside">
					<li>Secure user registration and login</li>
					<li>JWT-based session management</li>
					<li>Complete Invoice Management (Create, View, Update, Delete)</li>
					<li>Paginated invoice listing for easy navigation</li>
					<li>Unique invoice ID generation for easy tracking</li>
					<li>
						Profile picture management with Azure Blob Storage integration
					</li>
					<li>Swagger integration for API testing and documentation</li>
					<li>
						Account management features including deactivation and deletion
					</li>
				</ul>
			</div> */}
		</div>
	);
};

export default HomePage;
