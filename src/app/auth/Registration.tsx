// components/Registration.tsx
import React, { useState } from "react";

const Registration: React.FC = () => {
	const [formData, setFormData] = useState({
		email: "",
		username: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Handle the registration logic here
		console.log(formData);
		// You might want to send formData to your backend API
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
					htmlFor="username"
					className="block text-sm font-medium text-gray-700"
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
					Register
				</button>
			</div>
		</form>
	);
};

export default Registration;
