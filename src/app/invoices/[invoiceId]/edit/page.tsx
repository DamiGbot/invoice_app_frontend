"use client";

import { useEffect } from "react";
import { useTheme } from "@/app/context/themeContext";

import { InvoiceParams } from "@/app/types/Params";

import data from "../../../helpers/data.json";
import { Invoice } from "@/app/types/Invoice";

import { useFormik } from "formik";
import InvoiceForm from "@/app/components/InvoiceForm";

type EditInvoice = {
	params: InvoiceParams;
};

export default function EditInvoice({ params }: EditInvoice) {
	const { isLight } = useTheme();

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

	console.log(params);
	const invoiceData = data.find((el) => el.id === params.invoiceId) as Invoice;

	return (
		<section className="mt-[24px]">
			<p
				className={`mb-[24px] font-bold text-[24px] tracking-[-0.25px] ${
					isLight ? "text-[#0C0E16] " : "text-[#fff]"
				} leading-[32px]`}
			>
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
