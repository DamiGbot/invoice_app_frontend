import React from "react";

import Image from "next/image";

import { useTheme } from "../context/themeContext";
import InputField from "./InputField";
import Button from "./UI/Button";
import iconDelete from "../../../public/assets/icon-delete.svg";
import { Invoice } from "../types/Invoice";

type InvoiceFormProps = {
	invoiceData: Invoice;
};

export default function InvoiceForm({ invoiceData }: InvoiceFormProps) {
	const { isLight } = useTheme();

	return (
		<form>
			<div className="mb-[40px]">
				<p className="font-bold text-[12px] tracking-[-0.25px] text-[#7C5DFA] leading-[15px] mb-[24px]">
					Bill From
				</p>

				<InputField
					label="Street Address"
					name="Sender Address Street"
					type="text"
					value={invoiceData.senderAddress.street}
					onChange={() => {}}
				/>

				<div className="flex gap-[23px]">
					<InputField
						label="City"
						name="Sender Address City"
						type="text"
						value={invoiceData.senderAddress.city}
						onChange={() => {}}
					/>

					<InputField
						label="Post Code"
						name="Sender Address Post Code"
						type="text"
						value={invoiceData.senderAddress.postCode}
						onChange={() => {}}
					/>
				</div>

				<InputField
					label="Country"
					name="Sender Address Country"
					type="text"
					value={invoiceData.senderAddress.country}
					onChange={() => {}}
				/>
			</div>

			<div>
				<p className="font-bold text-[12px] tracking-[-0.25px] text-[#7C5DFA] leading-[15px] mb-[24px]">
					Bill To
				</p>

				<InputField
					label="Client's Name"
					name="Client's Name"
					type="text"
					value={invoiceData.clientName}
					onChange={() => {}}
				/>

				<InputField
					label="Client's Email"
					name="Client's Email"
					type="email"
					value={invoiceData.clientEmail}
					onChange={() => {}}
				/>

				<InputField
					label="Street Address"
					name="Client's Address Street"
					type="text"
					value={invoiceData.clientAddress.street}
					onChange={() => {}}
				/>

				<div className="flex gap-[23px]">
					<InputField
						label="City"
						name="Client's Address City"
						type="text"
						value={invoiceData.clientAddress.city}
						onChange={() => {}}
					/>

					<InputField
						label="Post Code"
						name="Client's Address Post Code"
						type="text"
						value={invoiceData.clientAddress.postCode}
						onChange={() => {}}
					/>
				</div>

				<InputField
					label="Country"
					name="Client's Address Country"
					type="text"
					value={invoiceData.clientAddress.country}
					onChange={() => {}}
				/>

				<InputField
					label="Invoice Date"
					name="Invoice Date"
					type="date"
					value={invoiceData.createdAt}
					onChange={() => {}}
				/>

				<InputField
					label="Payment Terms"
					name="Payment Terms"
					type="dropdown"
					value={invoiceData.createdAt}
					onChange={() => {}}
				/>

				<InputField
					label="Project Description"
					name="Project Description"
					type="text"
					value={invoiceData.description}
					onChange={() => {}}
				/>
			</div>

			<div className="mb-[40px]">
				<p className="font-bold text-[18px] tracking-[-0.38px] text-[#777F98] leading-[32px] mb-[24px]">
					Item List
				</p>

				{invoiceData.items.map((item, index) => {
					return (
						<div key={index} className="mb-[24px]">
							<InputField
								label="Item Name"
								name={`Item Name ${index}`}
								type="text"
								value={item.name}
								onChange={() => {}}
							/>

							<div className="flex w-full gap-[16px]">
								<div className="flex gap-[16px] w-7/12">
									<div className="mb-[24px] w-8/12">
										<label
											className={`font-medium text-[12px] tracking-[-0.25px] ${
												isLight ? "text-[#7E88C3]" : "text-[#888EB0]"
											} leading-[15px] mb-[10px]`}
											htmlFor={`Qty ${index}`}
										>
											Qty.
										</label>
										<input
											className={`w-full rounded-[4px] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] leading-[15px] ${
												isLight
													? "text-[#0C0E16] border-[#DFE3FA]"
													: "bg-[#1E2139] border-[#252945] text-[#fff]"
											}`}
											id={`Qty ${index}`}
											name={`Qty ${index}`}
											type="number"
											value={item.quantity}
											onChange={() => {}}
										/>
									</div>

									<div className="w-full mb-[24px]">
										<label
											className={`font-medium text-[12px] tracking-[-0.25px] ${
												isLight ? "text-[#7E88C3]" : "text-[#888EB0]"
											} leading-[15px] mb-[10px]`}
											htmlFor={`Price ${index}`}
										>
											Price
										</label>
										<input
											className={`w-full rounded-[4px] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px]  leading-[15px] ${
												isLight
													? "text-[#0C0E16] border-[#DFE3FA]"
													: "bg-[#1E2139] border-[#252945] text-[#fff]"
											}`}
											id={`Price ${index}`}
											name={`Price ${index}`}
											type="number"
											value={item.price}
											onChange={() => {}}
										/>
									</div>
								</div>

								<div className="flex gap-[16px] w-5/12">
									<div className="w-full">
										<p
											className={`font-medium text-sm ${
												isLight ? "text-[#7E88C3]" : "text-[#888EB0]"
											} mb-1.5`}
										>
											Total
										</p>
										<div className="w-full py-4  font-bold text-[12px] tracking-[-0.25px] text-[#888EB0] leading-[15px]">
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
					className={`w-full rounded-3xl font-bold text-[12px] tracking-[-0.25px] ${
						isLight
							? "text-[#7E88C3] bg-[#F9FAFE]"
							: "text-[#888EB0] bg-[#252945]"
					} leading-[15px]`}
					onClick={() => {
						console.log("Button Clicked");
					}}
					type="button"
				>
					+Add New Item
				</Button>
			</div>
		</form>
	);
}
