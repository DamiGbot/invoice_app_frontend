// components/Login.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "@/app/hooks/useDispatch";
import { RootState } from "@/app/lib/store";
import { login } from "@/app/lib/features/auth/authSlice";

import Wrapper from "../../components/Wrapper";
import { useTheme } from "@/app/context/themeContext";
import arrowLeft from "../../../../public/assets/icon-arrow-left.svg";
import { LoginData } from "@/app/types/Auth";
import {
	isTokenValid,
	isTokenExpired,
	refreshAccessToken,
} from "@/app/helpers/refreshToken";
import { unwrapResult } from "@reduxjs/toolkit";
import LoadingComponent from "@/app/components/UI/Loading";

const Login: React.FC = () => {
	const dispatch = useDispatch();
	const { loading, error } = useSelector((state: RootState) => state.auth);
	const [resultStatus, setresultStatus] = useState(false);
	const [formData, setFormData] = useState<LoginData>({
		email: "",
		password: "",
	});

	const router = useRouter();
	const { isLight } = useTheme();

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken") as string;

		// Optionally, add a function to verify the token's validity with your backend
		const verifyAndRefreshToken = async () => {
			if (accessToken == null || accessToken.length < 1) {
				return false;
			}

			const isValidIssuer = isTokenValid(accessToken);

			if (!isValidIssuer) {
				console.log("Invalid issuer. Redirecting to login...");
				return false;
			}

			const isExpired = isTokenExpired(accessToken);
			if (isExpired) {
				console.log("Token expired. Refreshing...");
				const result = await refreshAccessToken();

				if (result.isSuccess === undefined) {
					return false;
				}

				return true;
			}

			return true;
		};

		const checkAccess = async () => {
			if (await verifyAndRefreshToken()) {
				setresultStatus(true);
				router.replace("/invoices");
			}
		};

		checkAccess();
	}, [router]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Handle the login logic here
		const resultAction = await dispatch(
			login({ email: formData.email, password: formData.password })
		);

		const result = unwrapResult(resultAction);

		if (result.isSuccess) {
			router.replace("/invoices");
		}
	};

	const goBackHandler = () => {
		router.push("/");
	};

	const fontColor = isLight ? "text-[#0C0E16] " : "text-[#fff]";

	if (loading || resultStatus) return <LoadingComponent />;

	return (
		<Wrapper>
			<div className="inline-flex items-center">
				<div
					onClick={goBackHandler}
					className="flex items-center cursor-pointer bounce-effect"
				>
					<span className="mr-[12px]">
						<Image src={arrowLeft} alt="arrow Down" />
					</span>

					<p
						className={`font-bold text-[12px] tracking-[-0.25px] ${
							isLight ? "text-[#0C0E16]" : "text-[#fff]"
						} leading-[15px]`}
					>
						Go back
					</p>
				</div>
			</div>

			<h1
				className={`text-4xl font-bold text-center  dark:text-white mt-10 mb-4 ${fontColor}`}
			>
				Login
			</h1>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="email"
						className={`block text-sm font-medium ${fontColor}`}
					>
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						required
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						value={formData.email}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label
						htmlFor="password"
						className={`block text-sm font-medium ${fontColor}`}
					>
						Password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						required
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						value={formData.password}
						onChange={handleChange}
					/>
				</div>

				{error && <p className="text-red-500">{error}</p>}
				<div className="flex justify-between items-center">
					<Link
						href="/auth/Register"
						className={`underline ${
							isLight ? "text-gray-400" : "text-gray-400"
						} ${isLight ? "hover:text-black" : "hover:text-white"}`}
					>
						Register
					</Link>

					<div>
						<Link
							href="/auth/Register"
							className={`underline ${
								isLight ? "text-gray-400" : "text-gray-400"
							} ${isLight ? "hover:text-black" : "hover:text-white"} mr-4`}
						>
							Forgot your password
						</Link>

						<button
							type="submit"
							disabled={loading}
							className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 "
						>
							{loading ? "Logging in..." : "Login"}
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	);
};

export default Login;
