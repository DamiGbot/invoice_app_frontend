"use client";

import { useEffect } from "react";
import { InvoiceParams } from "@/app/types/Params";

import data from "../../../helpers/data.json";
import { Invoice } from "@/app/types/Invoice";
import { useFormik } from "formik";
import InvoiceForm from "@/app/components/InvoiceForm";

type EditInvoice = {
	params: InvoiceParams;
};

export default function EditInvoice({ params }: EditInvoice) {
	useEffect(() => {
		// Set specific background color when the page/component mounts
		document.body.style.backgroundColor = "#fff"; // New background color
		document.body.style.height = "100%";

		// Optional: Reset to default background color when the component unmounts
		return () => {
			document.body.style.backgroundColor = "#f8f8fb"; // Default background color
		};
	}, []);

	console.log(params);
	const invoiceData = data.find((el) => el.id === params.invoiceId) as Invoice;

	return (
		<section className="mt-[24px]">
			<p className="mb-[24px] font-bold text-[24px] tracking-[-0.25px] text-[#0C0E16] leading-[32px]">
				Edit <span className="text-[#888EB0]">#</span>
				{invoiceData.id}
			</p>

			<InvoiceForm invoiceData={invoiceData} />
		</section>
	);
}

{
	/* <form onSubmit={formik.handleSubmit}>
				<div>
					<p>Bill From</p>
					<div>
						<label htmlFor="firstName">Street Address</label>
						<input
							id="firstName"
							name="firstName"
							type="text"
							onChange={formik.handleChange}
							value={formik.values.senderAddress.street}
						/>
						{formik.errors.senderAddress?.street ? (
							<div>{formik.errors.senderAddress.street}</div>
						) : null}
					</div>
				</div>

				<button type="submit">Submit</button>
			</form> */
}
