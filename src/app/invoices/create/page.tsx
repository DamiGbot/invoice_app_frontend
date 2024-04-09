"use client";

import { useEffect } from "react";

import { useTheme } from "@/app/context/themeContext";
import InvoiceForm from "@/app/components/InvoiceForm";
import { Invoice } from "@/app/types/Invoice";
import withAuth from "@/app/components/withAuth";

import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";

const CreateInvoice = () => {
	const { isLight } = useTheme();
	const { currentInvoice } = useSelector((state: RootState) => state.invoice);

	useEffect(() => {
		const mainElement = document.querySelector("main");
		if (mainElement) {
			mainElement.style.backgroundColor = isLight ? "#fff" : "#141625";
		}

		return () => {
			if (mainElement) {
				mainElement.style.backgroundColor = isLight ? "#f8f8fb" : "#141625";
			}
		};
	}, [isLight]);

	const emptyInvoice: Invoice = {
		id: "",
		createdAt: "",
		frontendId: "",
		paymentDue: "",
		description: "",
		paymentTerms: 0, // Assuming 0 is a sensible default for your application
		clientName: "",
		clientEmail: "",
		status: "",
		senderAddress: {
			street: "",
			city: "",
			postCode: "",
			country: "",
		},
		clientAddress: {
			street: "",
			city: "",
			postCode: "",
			country: "",
		},
		items: [], // Empty array, assuming no items initially
		total: 0, // Assuming 0 total for an empty invoice
	};

	return (
		<section className="mt-[24px]">
			<p
				className={`mb-[24px] font-bold text-[24px] tracking-[-0.25px] ${
					isLight ? "text-[#0C0E16] " : "text-[#fff]"
				} leading-[32px]`}
			>
				New Invoice
			</p>

			<InvoiceForm invoiceData={currentInvoice} />
		</section>
	);
};

export default withAuth(CreateInvoice);
