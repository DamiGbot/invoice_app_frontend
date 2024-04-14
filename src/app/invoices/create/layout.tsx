"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "@/app/context/themeContext";

import { useRouter } from "next/navigation";
import arrowLeft from "../../../../public/assets/icon-arrow-left.svg";
import Wrapper from "@/app/components/Wrapper";
import Button from "@/app/components/UI/Button";
import { InvoiceParams } from "@/app/types/Params";
import { useResponsive } from "@/app/context/ResponsiveContext";

import { useSelector } from "react-redux";
import { useDispatch } from "@/app/hooks/useDispatch";
import { RootState } from "@/app/lib/store";
import {
	submitInvoice,
	resetInvoice,
	setValidationErrors,
	clearValidationErrors,
} from "@/app/lib/features/invoices/invoiceSlice";
import LoadingComponent from "@/app/components/UI/Loading";
import { unwrapResult } from "@reduxjs/toolkit";

type InvoiceLayoutProps = {
	children: React.ReactNode;
	params: InvoiceParams;
};

export default function InvoiceLayout({
	children,
	params,
}: InvoiceLayoutProps) {
	const router = useRouter();
	const { currentInvoice, status, validationErrors } = useSelector(
		(state: RootState) => state.invoice
	);
	const dispatch = useDispatch();
	const { isLight } = useTheme();
	const { isMobile } = useResponsive();

	const currentId = params.invoiceId;

	const goBackHandler = () => {
		router.back();
	};

	// Function to handle form submission
	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
		isReady: boolean
	) => {
		e.preventDefault();

		if (validateForm()) {
			const updatedInvoice = { ...currentInvoice, isReady: isReady };
			const resultAction = await dispatch(submitInvoice(updatedInvoice));

			const result = unwrapResult(resultAction);

			if (result.isSuccess) {
				if (Object.keys(validationErrors).length === 0) {
					dispatch(clearValidationErrors());
					router.push("/invoices");
				}
			}
		}
	};

	const handleDiscard = () => {
		dispatch(resetInvoice());
		dispatch(clearValidationErrors());
		router.push("/invoices");
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
		}

		// Validating other invoice details
		if (!currentInvoice.createdAt.trim()) {
			newErrors.createdAt = "Invoice date is required.";
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

	if (status === "loading") {
		return <LoadingComponent />;
	}

	let invoiceActions = (
		<footer
			className={`shadow-top ${
				isLight ? "bg-[#ffffff] " : "bg-[#1E2139]"
			} p-[24px] flex justify-between items-center font-bold text-[12px] tracking-[-0.25px] leading-[15px]`}
		>
			<Button
				onClick={handleDiscard}
				createPage={true}
				className={`px-[16px] ${
					isLight
						? "bg-[#F9FAFE] text-[#7E88C3]"
						: "bg-[#252945] text-[#DFE3FA]"
				}`}
			>
				Discard
			</Button>
			<Button
				onClick={(e) => handleSubmit(e, false)}
				createPage={true}
				className={`px-[16px] ${
					isLight
						? "bg-[#373B53] text-[#888EB0]"
						: "bg-[#373B53] text-[#DFE3FA]"
				}`}
			>
				Save as Draft
			</Button>
			<Button
				onClick={(e) => handleSubmit(e, true)}
				createPage={true}
				className="bg-[#7C5DFA] text-[#FFFFFF] px-[16px]"
			>
				Save & Send
			</Button>
		</footer>
	);

	if (!isMobile) {
		invoiceActions = (
			<div
				className={` p-[24px] flex justify-between items-center font-bold text-[12px] tracking-[-0.25px] leading-[15px]`}
			>
				<Button
					onClick={handleDiscard}
					createPage={true}
					className={`px-[16px] ${
						isLight
							? "bg-[#F9FAFE] text-[#7E88C3]"
							: "bg-[#252945] text-[#DFE3FA]"
					}`}
				>
					Discard
				</Button>

				<div className="flex gap-x-[8px]">
					<Button
						onClick={(e) => handleSubmit(e, false)}
						createPage={true}
						className={`px-[16px] ${
							isLight
								? "bg-[#373B53] text-[#888EB0]"
								: "bg-[#373B53] text-[#DFE3FA]"
						}`}
					>
						Save as Draft
					</Button>
					<Button
						onClick={(e) => handleSubmit(e, true)}
						createPage={true}
						className="bg-[#7C5DFA] text-[#FFFFFF] px-[16px]"
					>
						Save & Send
					</Button>
				</div>
			</div>
		);
	}

	return (
		<>
			<Wrapper>
				<div className="fixed inline-flex items-center">
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

				{children}

				{!isMobile && invoiceActions}
			</Wrapper>

			{isMobile && invoiceActions}
		</>
	);
}
