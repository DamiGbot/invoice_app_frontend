"use client";

import { useEffect } from "react";
import Image from "next/image";
import { InvoiceParams } from "@/app/types/Params";

import data from "../../../helpers/data.json";
import { Invoice } from "@/app/types/Invoice";
import iconDelete from "../../../../../public/assets/icon-delete.svg";
import { useFormik } from "formik";
import Button from "@/app/components/UI/Button";

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

	// const formik = useFormik({
	// 	initialValues: invoiceData,
	// 	onSubmit: (values: Invoice) => {
	// 		alert(JSON.stringify(values, null, 2));
	// 	},
	// });

	return (
		<section className="mt-[24px]">
			<p className="mb-[24px] font-bold text-[24px] tracking-[-0.25px] text-[#0C0E16] leading-[32px]">
				Edit <span className="text-[#888EB0]">#</span>
				{invoiceData.id}
			</p>

			{/* <form onSubmit={formik.handleSubmit}>
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
			</form> */}

			<form>
				<div className="mb-[40px]">
					<p className="font-bold text-[12px] tracking-[-0.25px] text-[#7C5DFA] leading-[15px] mb-[24px]">
						Bill From
					</p>

					<div className="w-full mb-[24px]">
						<label
							className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px] mb-[10px]"
							htmlFor="firstName"
						>
							Street Address
						</label>
						<input
							className="w-full rounded-[4px] border-[#DFE3FA] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]"
							id="firstName"
							name="firstName"
							type="text"
							value={invoiceData.senderAddress.street}
						/>
					</div>

					<div className="flex gap-[23px]">
						<div className="w-full mb-[24px]">
							<label
								className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px] mb-[10px]"
								htmlFor="firstName"
							>
								City
							</label>
							<input
								className="w-full rounded-[4px] border-[#DFE3FA] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]"
								id="firstName"
								name="firstName"
								type="text"
								value={invoiceData.senderAddress.city}
							/>
						</div>

						<div className="w-full mb-[24px]">
							<label
								className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px] mb-[10px]"
								htmlFor="firstName"
							>
								Post Code
							</label>
							<input
								className="w-full rounded-[4px] border-[#DFE3FA] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]"
								id="firstName"
								name="firstName"
								type="text"
								value={invoiceData.senderAddress.postCode}
							/>
						</div>
					</div>

					<div className="w-full mb-[24px]">
						<label
							className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px] mb-[10px]"
							htmlFor="firstName"
						>
							Country
						</label>
						<input
							className="w-full rounded-[4px] border-[#DFE3FA] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]"
							id="firstName"
							name="firstName"
							type="text"
							value={invoiceData.senderAddress.country}
						/>
					</div>
				</div>

				<div>
					<p className="font-bold text-[12px] tracking-[-0.25px] text-[#7C5DFA] leading-[15px] mb-[24px]">
						Bill To
					</p>

					<div className="w-full mb-[24px]">
						<label
							className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px] mb-[10px]"
							htmlFor="firstName"
						>
							Client's Name
						</label>
						<input
							className="w-full rounded-[4px] border-[#DFE3FA] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]"
							id="firstName"
							name="firstName"
							type="text"
							value={invoiceData.clientName}
						/>
					</div>

					<div className="w-full mb-[24px]">
						<label
							className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px] mb-[10px]"
							htmlFor="firstName"
						>
							Client's Email
						</label>
						<input
							className="w-full rounded-[4px] border-[#DFE3FA] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]"
							id="firstName"
							name="firstName"
							type="text"
							value={invoiceData.clientEmail}
						/>
					</div>

					<div className="w-full mb-[24px]">
						<label
							className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px] mb-[10px]"
							htmlFor="firstName"
						>
							Street Address
						</label>
						<input
							className="w-full rounded-[4px] border-[#DFE3FA] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]"
							id="firstName"
							name="firstName"
							type="text"
							value={invoiceData.clientAddress.street}
						/>
					</div>

					<div className="flex gap-[23px]">
						<div className="w-full mb-[24px]">
							<label
								className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px] mb-[10px]"
								htmlFor="firstName"
							>
								City
							</label>
							<input
								className="w-full rounded-[4px] border-[#DFE3FA] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]"
								id="firstName"
								name="firstName"
								type="text"
								value={invoiceData.clientAddress.city}
							/>
						</div>

						<div className="w-full mb-[24px]">
							<label
								className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px] mb-[10px]"
								htmlFor="firstName"
							>
								Post Code
							</label>
							<input
								className="w-full rounded-[4px] border-[#DFE3FA] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]"
								id="firstName"
								name="firstName"
								type="text"
								value={invoiceData.clientAddress.postCode}
							/>
						</div>
					</div>

					<div className="w-full mb-[24px]">
						<label
							className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px] mb-[10px]"
							htmlFor="firstName"
						>
							Country
						</label>
						<input
							className="w-full rounded-[4px] border-[#DFE3FA] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]"
							id="firstName"
							name="firstName"
							type="text"
							value={invoiceData.clientAddress.country}
						/>
					</div>

					<div className="w-full mb-[24px]">
						<label
							className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px] mb-[10px]"
							htmlFor="firstName"
						>
							Invoice Date
						</label>
						<input
							className="w-full rounded-[4px] border-[#DFE3FA] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]"
							id="firstName"
							name="firstName"
							type="date"
							value={invoiceData.createdAt}
						/>
					</div>

					<div className="w-full mb-[24px]">
						<label
							className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px] mb-[10px]"
							htmlFor="firstName"
						>
							Payment Terms
						</label>
						<input
							className="w-full rounded-[4px] border-[#DFE3FA] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]"
							id="firstName"
							name="firstName"
							type="dropdown"
							value={invoiceData.clientAddress.country}
						/>
					</div>

					<div className="w-full mb-[24px]">
						<label
							className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px] mb-[10px]"
							htmlFor="firstName"
						>
							Project Description
						</label>
						<input
							className="w-full rounded-[4px] border-[#DFE3FA] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]"
							id="firstName"
							name="firstName"
							type="text"
							value={invoiceData.description}
						/>
					</div>
				</div>

				<div className="mb-[40px]">
					<p className="font-bold text-[12px] tracking-[-0.25px] text-[#7C5DFA] leading-[15px] mb-[24px]">
						Item List
					</p>

					{invoiceData.items.map((item, index) => {
						return (
							<div key={index} className="mb-[24px]">
								<div className="w-full mb-[24px]">
									<label
										className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px] mb-[10px]"
										htmlFor="firstName"
									>
										Item Name
									</label>
									<input
										className="w-full rounded-[4px] border-[#DFE3FA] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]"
										id="firstName"
										name="firstName"
										type="text"
										value={item.name}
									/>
								</div>

								<div className="flex w-full gap-[16px]">
									<div className="flex gap-[16px] w-7/12">
										<div className="mb-[24px] w-8/12">
											<label
												className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px] mb-[10px]"
												htmlFor="firstName"
											>
												Qty.
											</label>
											<input
												className="w-full rounded-[4px] border-[#DFE3FA] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]"
												id="firstName"
												name="firstName"
												type="number"
												value={item.quantity}
											/>
										</div>

										<div className="w-full mb-[24px]">
											<label
												className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px] mb-[10px]"
												htmlFor="firstName"
											>
												Price
											</label>
											<input
												className="w-full rounded-[4px] border-[#DFE3FA] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]"
												id="firstName"
												name="firstName"
												type="number"
												value={item.price}
											/>
										</div>
									</div>

									<div className="flex gap-[16px] w-5/12">
										<div className="w-full">
											<label
												className="font-medium text-sm text-[#7E88C3] mb-2.5"
												htmlFor={`total-${index}`}
											>
												Total
											</label>
											<div className="w-full py-4  font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]">
												{item.total}
											</div>
										</div>

										<div className="flex flex-col w-full items-end">
											<div className="h-[37px]"></div>
											<Image src={iconDelete} alt="delete icon" />
										</div>
									</div>
								</div>
							</div>
						);
					})}

					<Button
						className="w-full bg-[#F9FAFE] rounded-3xl font-bold text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px]"
						onClick={() => {
							console.log("Button Clicked");
						}}
					>
						+Add New Item
					</Button>
				</div>
			</form>
		</section>
	);
}
