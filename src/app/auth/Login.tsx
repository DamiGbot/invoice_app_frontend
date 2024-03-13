// components/Login.tsx
import Link from "next/link";
import React, { useState } from "react";

const Login: React.FC = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Handle the login logic here
		console.log(formData);
		// You might want to authenticate against your backend API
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
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
					className="block text-sm font-medium text-gray-700"
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
			<div>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
				>
					Login
				</button>
				<Link href="/">Register</Link>
			</div>
		</form>
	);
};

export default Login;
