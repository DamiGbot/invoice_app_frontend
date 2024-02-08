"use client";

import { useEffect } from "react";
import InvoiceForm from "@/app/components/InvoiceForm";
import { Invoice } from "@/app/types/Invoice";

export default function CreateInvoice() {
	useEffect(() => {
		// Set specific background color when the page/component mounts
		document.body.style.backgroundColor = "#fff"; // New background color
		document.body.style.height = "100%";

		// Optional: Reset to default background color when the component unmounts
		return () => {
			document.body.style.backgroundColor = "#f8f8fb"; // Default background color
		};
	}, []);

	const emptyInvoice: Invoice = {
		id: "",
		createdAt: "",
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
			<p className="mb-[24px] font-bold text-[24px] tracking-[-0.25px] text-[#0C0E16] leading-[32px]">
				New Invoice
			</p>

			<InvoiceForm invoiceData={emptyInvoice} />
		</section>
	);
}
