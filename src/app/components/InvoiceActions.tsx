"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import apiInstance from "../api/axios";
import axios from "axios";

import Modal from "@/app/components/UI/Modal";
import Card from "@/app/components/Card";
import Button from "@/app/components/UI/Button";
import { useTheme } from "@/app/context/themeContext";
import { useResponsive } from "../context/ResponsiveContext";
import { InvoiceParams } from "../types/Params";
import LoadingComponent from "./UI/Loading";
import { useSelector } from "react-redux";
import { useDispatch } from "@/app/hooks/useDispatch";
import { RootState } from "@/app/lib/store";
import {
	resetInvoice,
	setValidationErrors,
	clearValidationErrors,
} from "@/app/lib/features/invoices/invoiceSlice";
import ErrorModal from "./UI/Error";
import { validateEmail } from "../helpers/formatDate";

type InvoiceActionsProps = {
	params: InvoiceParams;
	className: string;
	markAsPaidRequest?: () => Promise<void>;
	markAsPendingRequest?: () => Promise<void>;
	status?: string;
	frontendId?: string;
};

export default function InvoiceActions({
	params,
	className,
	markAsPaidRequest,
	status,
	frontendId,
	markAsPendingRequest,
}: InvoiceActionsProps) {
	// console.log(params);

	const [isModalOpen, setModalOpen] = useState(false);
	const router = useRouter();
	const pathString = usePathname();
	const { isLight } = useTheme();
	const { isMobile } = useResponsive();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const dispatch = useDispatch();
	const { currentInvoice } = useSelector((state: RootState) => state.invoice);

	const themes = `${isLight ? "bg-[#ffffff] " : "bg-[#1E2139]"}`;

	const isEdit = pathString.split("/")[3] === "edit";

	const currentId = params.invoiceId;

	const editHandler = () => {
		router.push(`/invoices/${currentId}/edit`);
	};

	const deleteHandler = () => {
		setModalOpen(true);
		document.body.style.overflow = "hidden";
	};

	const deleteAction = async () => {
		setLoading(true);
		try {
			const accessToken = localStorage.getItem("accessToken");
			const response = await apiInstance.delete(`/invoice/${currentId}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			console.log(response.data);

			setLoading(false);
			router.replace("/invoices");
		} catch (err) {
			if (axios.isAxiosError(err) && err.response) {
				setError(
					err.response.data.message ||
						"An error occurred while fetching invoices."
				);
			} else {
				setError("An unknown error occurred");
			}
			setLoading(false);
		}
	};

	const closeModal = () => {
		setModalOpen(false);
		// Optionally, reset scrolling behavior when modal closes
		document.body.style.overflow = "auto";
	};

	const cancelHandler = () => {
		dispatch(resetInvoice());
		dispatch(clearValidationErrors());
		router.push(`/invoices/${currentId}`);
	};

	const validateForm = () => {
		let newErrors = {};

		// Validating sender address fields
		if (!currentInvoice.senderAddress.street.trim()) {
			newErrors.senderAddressStreet = "Sender's street address is required.";
		}
		if (!currentInvoice.senderAddress.city.trim()) {
			newErrors.senderAddressCity = "Sender's city is required.";
		}
		if (!currentInvoice.senderAddress.postCode.trim()) {
			newErrors.senderAddressPostCode = "Sender's post code is required.";
		}
		if (!currentInvoice.senderAddress.country.trim()) {
			newErrors.senderAddressCountry = "Sender's country is required.";
		}

		// Validating client address fields
		if (!currentInvoice.clientAddress.street.trim()) {
			newErrors.clientAddressStreet = "Client's street address is required.";
		}
		if (!currentInvoice.clientAddress.city.trim()) {
			newErrors.clientAddressCity = "Client's city is required.";
		}
		if (!currentInvoice.clientAddress.postCode.trim()) {
			newErrors.clientAddressPostCode = "Client's post code is required.";
		}
		if (!currentInvoice.clientAddress.country.trim()) {
			newErrors.clientAddressCountry = "Client's country is required.";
		}

		// Validating client contact information
		if (!currentInvoice.clientName.trim()) {
			newErrors.clientName = "Client's name is required.";
		}
		if (!currentInvoice.clientEmail.trim()) {
			newErrors.clientEmail = "Client's email is required.";
		} else {
			if (!validateEmail(currentInvoice.clientEmail)) {
				newErrors.clientEmail = "Please enter a valid email address.";
			}
		}

		if (!currentInvoice.description.trim()) {
			newErrors.description = "Project description is required.";
		}
		if (
			isNaN(currentInvoice.paymentTerms) ||
			currentInvoice.paymentTerms <= 0
		) {
			newErrors.paymentTerms = "Valid payment terms are required.";
		}

		// Check if there are any items added
		if (currentInvoice.items.length === 0) {
			newErrors.items = "At least one item must be added to the invoice.";
		} else {
			// Validate each item
			currentInvoice.items.forEach((item, index) => {
				const baseKey = `item${index}`;

				if (!item.name.trim()) {
					newErrors[`${baseKey}Name`] = `Name is required.`;
				}
				if (!item.quantity || item.quantity <= 0) {
					newErrors[`${baseKey}Quantity`] = `Quantity must be greater than 0.`;
				}
				if (!item.price || item.price <= 0) {
					newErrors[`${baseKey}Price`] = `Price must be greater than 0.`;
				}
			});
		}

		dispatch(setValidationErrors(newErrors));
		return Object.keys(newErrors).length === 0;
	};

	const saveChangesHandler = async () => {
		if (!validateForm()) {
			return;
		}
		setLoading(true);

		try {
			console.log(currentId);
			const accessToken = localStorage.getItem("accessToken");
			const response = await apiInstance.put(
				`/invoice/edit/${currentId}`,
				currentInvoice,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(response.data);

			setLoading(false);
			router.replace(`/invoices/${currentId}`);
		} catch (err) {
			if (axios.isAxiosError(err) && err.response) {
				setError(
					err.response.data.message ||
						"An error occurred while fetching invoices."
				);
			} else {
				setError("An unknown error occurred");
			}
			setLoading(false);
		}
	};

	const markAsPaidHandler = async () => {
		await markAsPaidRequest?.();
	};

	const markAsPendingHandler = async () => {
		await markAsPendingRequest?.();
	};

	if (loading) return <LoadingComponent />;

	if (error !== null) {
		return (
			<div>
				{error && <ErrorModal errorMessage={error} />}
				Please go back to Invoice Page: <Link href="/invoices">click here</Link>
			</div>
		);
	}

	console.log(status);

	return (
		<>
			{isModalOpen && (
				<Modal isOpen={isModalOpen} onClose={closeModal}>
					<Card
						className={`mx-[24px] p-[32px] ${
							isLight ? "bg-[#ffffff] " : "bg-[#1E2139]"
						}`}
					>
						<p
							className={`mb-[8px] font-bold text-[20px] tracking-[-0.42px] ${
								isLight ? "text-[#0C0E16]" : "text-[#fff]"
							} leading-[32px]`}
						>
							Confirm Deletion
						</p>
						<p className="mb-[24px] font-medium text-[12px] tracking-[-0.25px] text-[#888EB0] leading-[22px]">{`Are you sure you want to delete invoice ${
							frontendId == null ? "" : `#${frontendId}`
						}? This action cannot be undone.`}</p>

						<div className="flex gap-[8px] justify-end items-center">
							<Button
								onClick={closeModal}
								className={`${
									isLight
										? "bg-[#F9FAFE] text-[#7E88C3]"
										: "bg-[#252945] text-[#DFE3FA]"
								}`}
							>
								Cancel
							</Button>
							<Button
								onClick={deleteAction} // This should do the final delete
								className="bg-[#EC5757] text-[#FFFF]"
							>
								Delete
							</Button>
						</div>
					</Card>
				</Modal>
			)}

			{isEdit ? (
				<div
					className={`${
						isMobile ? `shadow-top ${themes}` : ""
					} w-full gap-[8px] justify-end  ${className}`}
				>
					<Button
						onClick={cancelHandler}
						className={`${
							isLight
								? "bg-[#F9FAFE] text-[#7E88C3]"
								: "bg-[#252945] text-[#DFE3FA]"
						}`}
					>
						Cancel
					</Button>
					<Button
						onClick={saveChangesHandler}
						className="bg-[#7C5DFA] text-[#FFFFFF]"
					>
						Save Changes
					</Button>
				</div>
			) : (
				<div className={`flex items-center ${themes} ${className}`}>
					{status !== null && status?.toLowerCase() === "draft" && (
						<Button
							onClick={editHandler}
							className={`${
								isLight
									? "bg-[#F9FAFE] text-[#7E88C3]"
									: "bg-[#252945] text-[#DFE3FA]"
							}`}
						>
							Edit
						</Button>
					)}

					<Button onClick={deleteHandler} className="bg-[#EC5757] text-[#FFFF]">
						Delete
					</Button>

					{status !== null && status?.toLowerCase() === "pending" && (
						<Button
							onClick={markAsPaidHandler}
							className="bg-[#7C5DFA] text-[#FFFFFF]"
						>
							Mark as Paid
						</Button>
					)}

					{status !== null && status?.toLowerCase() === "draft" && (
						<Button
							onClick={markAsPendingHandler}
							className="bg-[#7C5DFA] text-[#FFFFFF]"
						>
							Mark as Pending
						</Button>
					)}
				</div>
			)}
		</>
	);
}
