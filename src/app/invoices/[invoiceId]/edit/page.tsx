"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/app/context/themeContext";

import { InvoiceParams } from "@/app/types/Params";

import apiInstance from "../../../api/axios";
import axios from "axios";
import { Invoice } from "@/app/types/Invoice";

import InvoiceForm from "@/app/components/InvoiceForm";
import InvoiceActions from "@/app/components/InvoiceActions";
import { useResponsive } from "@/app/context/ResponsiveContext";
import ErrorModal from "@/app/components/UI/Error";
import LoadingComponent from "@/app/components/UI/Loading";

type EditInvoiceProps = {
	params: InvoiceParams;
};

const EditInvoice = ({ params }: EditInvoiceProps) => {
	const { isMobile } = useResponsive();
	const { isLight } = useTheme();
	const [invoiceData, setData] = useState<Invoice | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const currentId = params.invoiceId;

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

	useEffect(() => {
		const fetchInvoices = async () => {
			try {
				const accessToken = localStorage.getItem("accessToken");
				const response = await apiInstance.get(`/invoice/${currentId}`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				console.log(response.data);

				setData(response.data.result);

				setLoading(false);
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

		fetchInvoices();
	}, [currentId]);

	console.log(params);

	if (loading) return <LoadingComponent />;

	if (invoiceData === null) {
		return (
			<div>
				{error && <ErrorModal errorMessage={error} />}
				Please go back to Invoice Page: <Link href="/invoices">click here</Link>
			</div>
		);
	}

	return (
		<section className="mt-[24px]">
			<p
				className={`mb-[24px] font-bold text-[24px] tracking-[-0.25px] ${
					isLight ? "text-[#0C0E16] " : "text-[#fff]"
				} leading-[32px]`}
			>
				Edit <span className="text-[#888EB0]">#</span>
				{invoiceData.frontendId}
			</p>

			<InvoiceForm invoiceData={invoiceData} />
			{!isMobile && (
				<InvoiceActions
					params={params}
					className="flex"
					status={invoiceData.status}
					frontendId={invoiceData.frontendId}
				/>
			)}
		</section>
	);
};

export default EditInvoice;
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
