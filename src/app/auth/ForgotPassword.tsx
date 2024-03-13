import { useState, FormEvent } from "react";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		// Add your API call logic here
		console.log("Email submitted for password reset:", email);

		// Simulate API call delay and response
		setTimeout(() => {
			setSubmitted(true);
		}, 1000);
	};

	if (submitted) {
		return (
			<div className="text-center p-4">
				Check your email for the password reset link.
			</div>
		);
	}

	return (
		<div className="max-w-md mx-auto mt-10">
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						Email Address
					</label>
					<input
						type="email"
						name="email"
						id="email"
						required
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
					/>
				</div>
				<button
					type="submit"
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Send Password Reset Email
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
