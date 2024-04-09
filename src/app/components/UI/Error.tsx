import React, { useEffect, useState } from "react";

type ErrorModalProps = {
	errorMessage: string;
};

const ErrorModal: React.FC<ErrorModalProps> = ({ errorMessage }) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (errorMessage) {
			setIsVisible(true);
			const timer = setTimeout(() => {
				setIsVisible(false);
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [errorMessage]);

	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
			<div className="bg-white p-6 rounded-lg shadow-lg text-center">
				<p className="text-red-500">{errorMessage}</p>
			</div>
		</div>
	);
};

export default ErrorModal;
