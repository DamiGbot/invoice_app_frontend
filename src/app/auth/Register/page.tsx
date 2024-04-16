// components/Registration.tsx
"use client";

import Wrapper from "@/app/components/Wrapper";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/context/themeContext";
import arrowLeft from "../../../../public/assets/icon-arrow-left.svg";
import { unwrapResult } from "@reduxjs/toolkit";

import { login, register } from "@/app/lib/features/auth/authSlice";
import { RegisterData } from "@/app/types/Auth";
import { useSelector } from "react-redux";
import { useDispatch } from "@/app/hooks/useDispatch";
import { RootState } from "@/app/lib/store";

import LoadingComponent from "@/app/components/UI/Loading";

const Registration: React.FC = () => {
	const [formData, setFormData] = useState<RegisterData>({
		firstName: "",
		lastName: "",
		email: "",
		username: "",
		password: "",
	});
	const router = useRouter();
	const { isLight } = useTheme();
	const dispatch = useDispatch();
	const { loading, error } = useSelector((state: RootState) => state.auth);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const actionResult = await dispatch(register(formData));
		const result = unwrapResult(actionResult);
		if (result.isSuccess) {
			const resultAction = await dispatch(
				login({ email: formData.email, password: formData.password })
			);

			const loginResult = unwrapResult(resultAction);

			if (loginResult.isSuccess) {
				router.replace("/invoices");
			}
		}
	};

	const goBackHandler = () => {
		router.push("/");
	};

	const fontColor = isLight ? "text-[#0C0E16] " : "text-[#fff]";

	if (loading) return <LoadingComponent />;

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

			<h1 className={`text-4xl font-bold text-center mt-10 mb-4 ${fontColor}`}>
				Register
			</h1>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="firstName"
						className={`block text-sm font-medium  ${fontColor}`}
					>
						First Name
					</label>
					<input
						type="firstName"
						name="firstName"
						id="firstName"
						required
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						value={formData.firstName}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label
						htmlFor="lastName"
						className={`block text-sm font-medium  ${fontColor}`}
					>
						Last Name
					</label>
					<input
						type="lastName"
						name="lastName"
						id="lastName"
						required
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						value={formData.lastName}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label
						htmlFor="email"
						className={`block text-sm font-medium  ${fontColor}`}
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
						htmlFor="username"
						className={`block text-sm font-medium  ${fontColor}`}
					>
						Username
					</label>
					<input
						type="text"
						name="username"
						id="username"
						required
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						value={formData.username}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label
						htmlFor="password"
						className={`block text-sm font-medium  ${fontColor}`}
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
						href="/auth/Login"
						className={`underline ${
							isLight ? "text-gray-400" : "text-gray-400"
						} ${isLight ? "hover:text-black" : "hover:text-white"}`}
					>
						Already registered?
					</Link>

					<button
						type="submit"
						disabled={loading}
						className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
					>
						{/* Register */}
						{loading ? "In process... in..." : "Register"}
					</button>
				</div>
			</form>
		</Wrapper>
	);
};

export default Registration;
