import React from "react";
import apiInstance from "../api/axios";
import axios from "axios";
import { useNotification } from "../context/NotificationContext";

interface DownloadButtonProps {
	invoiceId: string;
}

const DownloadInvoiceButton: React.FC<DownloadButtonProps> = ({
	invoiceId,
}) => {
	const { triggerNotification } = useNotification();

	const handleDownload = async () => {
		try {
			const accessToken = localStorage.getItem("accessToken");

			const response = await axios.post(
				`https://testfucntion2834934.azurewebsites.net/api/pdfDownload384793?`,
				{
					invoiceId: invoiceId,
				},
				{
					responseType: "blob", // Important for downloading files
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.status === 200) {
				const blob = new Blob([response.data], { type: "application/pdf" });
				const downloadUrl = window.URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = downloadUrl;
				link.download = `Invoice_${invoiceId}.pdf`;
				document.body.appendChild(link);
				link.click();
				link.remove();
				window.URL.revokeObjectURL(downloadUrl);
				triggerNotification("Invoice downloaded successfully!", "success");
			} else {
				triggerNotification(
					"Unexpected status received, download might not be successful.",
					"warning"
				);
			}
		} catch (error) {
			console.error("Download error:", error);
			triggerNotification(
				"Failed to download invoice. Please try again later.",
				"error"
			);
			if (axios.isAxiosError(error) && error.response) {
				console.error(
					"Download failed:",
					error.response.status,
					error.response.data
				);
				triggerNotification(
					`Error ${error.response.status}: ${error.response.data}`,
					"error"
				);
			}
		}
	};

	return (
		<button
			onClick={handleDownload}
			className="flex flex-row items-center p-3 bg-[#7C5DFA] text-white rounded-full shadow-lg hover:bg-[#6b5ac9] transition duration-150 ease-in-out bounce-effect"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				className="feather feather-download"
			>
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
				<polyline points="7 10 12 15 17 10"></polyline>
				<line x1="12" y1="15" x2="12" y2="3"></line>
			</svg>
		</button>
	);
};

export default DownloadInvoiceButton;
