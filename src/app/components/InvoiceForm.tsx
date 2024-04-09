import React from "react";

import Image from "next/image";

import { useTheme } from "../context/themeContext";
import InputField from "./InputField";
import Button from "./UI/Button";
import iconDelete from "../../../public/assets/icon-delete.svg";
import { Invoice } from "../types/Invoice";

import { useDispatch } from "@/app/hooks/useDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import {
	addItem,
	deleteItem,
	updateInvoice,
	submitInvoice,
	resetInvoice,
} from "@/app/lib/features/invoices/invoiceSlice";

type InvoiceFormProps = {
	invoiceData: Invoice;
};

export default function InvoiceForm({ invoiceData }: InvoiceFormProps) {
	const dispatch = useDispatch();
	const { isLight } = useTheme();
	const { items } = useSelector(
		(state: RootState) => state.invoice.currentInvoice
	);

	const handleAddItem = () => {
		dispatch(addItem());
	};

	const handleItemChange = (index: number, field: keyof Item, value: any) => {
		const updatedItem = { ...items[index], [field]: value };
		// Calculate the total for the item
		updatedItem.total = updatedItem.quantity * updatedItem.price;
		dispatch(updateItem({ index, item: updatedItem }));
	};

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
					onChange={(e) =>
						dispatch(
							updateInvoice({
								senderAddress: {
									...invoiceData.senderAddress,
									street: e.target.value,
								},
							})
						)
					}
				/>

				<div className="flex gap-[23px]">
					<InputField
						label="City"
						name="Sender Address City"
						type="text"
						value={invoiceData.senderAddress.city}
						onChange={(e) =>
							dispatch(
								updateInvoice({
									senderAddress: {
										...invoiceData.senderAddress,
										city: e.target.value,
									},
								})
							)
						}
					/>

					<InputField
						label="Post Code"
						name="Sender Address Post Code"
						type="text"
						value={invoiceData.senderAddress.postCode}
						onChange={(e) =>
							dispatch(
								updateInvoice({
									senderAddress: {
										...invoiceData.senderAddress,
										postCode: e.target.value,
									},
								})
							)
						}
					/>
				</div>

				<InputField
					label="Country"
					name="Sender Address Country"
					type="text"
					value={invoiceData.senderAddress.country}
					onChange={(e) =>
						dispatch(
							updateInvoice({
								senderAddress: {
									...invoiceData.senderAddress,
									country: e.target.value,
								},
							})
						)
					}
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
					onChange={(e) =>
						dispatch(
							updateInvoice({
								clientName: e.target.value,
							})
						)
					}
				/>

				<InputField
					label="Client's Email"
					name="Client's Email"
					type="email"
					value={invoiceData.clientEmail}
					onChange={(e) =>
						dispatch(
							updateInvoice({
								clientEmail: e.target.value,
							})
						)
					}
				/>

				<InputField
					label="Street Address"
					name="Client's Address Street"
					type="text"
					value={invoiceData.clientAddress.street}
					onChange={(e) =>
						dispatch(
							updateInvoice({
								clientAddress: {
									...invoiceData.clientAddress,
									street: e.target.value,
								},
							})
						)
					}
				/>

				<div className="flex gap-[23px]">
					<InputField
						label="City"
						name="Client's Address City"
						type="text"
						value={invoiceData.clientAddress.city}
						onChange={(e) =>
							dispatch(
								updateInvoice({
									clientAddress: {
										...invoiceData.clientAddress,
										city: e.target.value,
									},
								})
							)
						}
					/>

					<InputField
						label="Post Code"
						name="Client's Address Post Code"
						type="text"
						value={invoiceData.clientAddress.postCode}
						onChange={(e) =>
							dispatch(
								updateInvoice({
									clientAddress: {
										...invoiceData.clientAddress,
										postCode: e.target.value,
									},
								})
							)
						}
					/>
				</div>

				<InputField
					label="Country"
					name="Client's Address Country"
					type="text"
					value={invoiceData.clientAddress.country}
					onChange={(e) =>
						dispatch(
							updateInvoice({
								clientAddress: {
									...invoiceData.clientAddress,
									country: e.target.value,
								},
							})
						)
					}
				/>

				<InputField
					label="Invoice Date"
					name="Invoice Date"
					type="date"
					value={invoiceData.createdAt}
					onChange={(e) =>
						dispatch(
							updateInvoice({
								createdAt: e.target.value,
							})
						)
					}
				/>

				<InputField
					label="Payment Terms"
					name="Payment Terms"
					type="number"
					value={invoiceData.paymentTerms}
					onChange={(e) =>
						dispatch(
							updateInvoice({
								paymentTerms: e.target.value,
							})
						)
					}
				/>

				<InputField
					label="Project Description"
					name="Project Description"
					type="text"
					value={invoiceData.description}
					onChange={(e) =>
						dispatch(
							updateInvoice({
								description: e.target.value,
							})
						)
					}
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
								onChange={(e) =>
									handleItemChange(index, "name", e.target.value)
								}
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
											onChange={(e) =>
												handleItemChange(index, "quantity", +e.target.value)
											}
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
											onChange={(e) =>
												handleItemChange(index, "price", +e.target.value)
											}
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
										<Image
											src={iconDelete}
											alt="delete icon"
											onClick={() => dispatch(deleteItem(index))}
										/>
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
					onClick={handleAddItem}
					type="button"
				>
					+Add New Item
				</Button>
			</div>
		</form>
	);
}
