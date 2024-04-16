import React, { useEffect } from "react";

import Image from "next/image";

import { useTheme } from "../context/themeContext";
import InputField from "./InputField";
import Button from "./UI/Button";
import iconDelete from "../../../public/assets/icon-delete.svg";
import { Invoice, Item } from "../types/Invoice";
import { useRouter, usePathname } from "next/navigation";

import { useDispatch } from "@/app/hooks/useDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import {
	addItem,
	deleteItem,
	updateInvoice,
	updateItem,
	resetInvoice,
	clearValidationErrors,
} from "@/app/lib/features/invoices/invoiceSlice";
import { formatDateFromArray, validateEmail } from "../helpers/formatDate";

type InvoiceFormProps = {
	invoiceData: Invoice;
};

const formatDate = (dateString) => {
	const date = dateString.length < 1 ? new Date() : new Date(dateString);
	return new Intl.DateTimeFormat("en-CA", {
		// 'en-CA' uses the YYYY-MM-DD format
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(date);
};

export default function InvoiceForm({ invoiceData }: InvoiceFormProps) {
	const dispatch = useDispatch();
	const { isLight } = useTheme();
	const { validationErrors } = useSelector((state: RootState) => state.invoice);
	const { items } = useSelector(
		(state: RootState) => state.invoice.currentInvoice
	);
	const pathString = usePathname();

	useEffect(() => {
		return () => {
			dispatch(resetInvoice());
			dispatch(clearValidationErrors());
		};
	}, [dispatch]);

	const handleAddItem = () => {
		dispatch(addItem());
	};
	const isEdit = pathString.split("/")[3] === "edit";

	const handleItemChange = (
		index: number,
		field: keyof Item,
		event: React.ChangeEvent<HTMLInputElement> | string
	) => {
		// Directly use the event target's value for the update
		let value = typeof event === "string" ? event : event.target.value;

		const updatedItem: any = { ...items[index], [field]: value };

		// Convert to number for calculation only, not for state update
		if (field === "quantity" || field === "price") {
			const numericalValue = parseFloat(value);
			updatedItem[field] = isNaN(numericalValue) ? 0 : numericalValue;

			// Recalculate total only if both quantity and price are present and valid numbers
			if (!isNaN(updatedItem.quantity) && !isNaN(updatedItem.price)) {
				updatedItem.total = updatedItem.quantity * updatedItem.price;
			}
		} else {
			updatedItem[field] = value;
		}

		dispatch(updateItem({ index, item: updatedItem }));
	};

	return (
		<>
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
						onChange={(newValue) =>
							dispatch(
								updateInvoice({
									senderAddress: {
										...invoiceData.senderAddress,
										street: newValue,
									},
								})
							)
						}
						error={validationErrors.senderAddressStreet}
					/>

					<div className="flex gap-[23px]">
						<InputField
							label="City"
							name="Sender Address City"
							type="text"
							value={invoiceData.senderAddress.city}
							onChange={(newValue) =>
								dispatch(
									updateInvoice({
										senderAddress: {
											...invoiceData.senderAddress,
											city: newValue,
										},
									})
								)
							}
							error={validationErrors.senderAddressCity}
						/>

						<InputField
							label="Post Code"
							name="Sender Address Post Code"
							type="text"
							value={invoiceData.senderAddress.postCode}
							onChange={(newValue) =>
								dispatch(
									updateInvoice({
										senderAddress: {
											...invoiceData.senderAddress,
											postCode: newValue,
										},
									})
								)
							}
							error={validationErrors.senderAddressPostCode}
						/>
					</div>

					<InputField
						label="Country"
						name="Sender Address Country"
						type="text"
						value={invoiceData.senderAddress.country}
						onChange={(newValue) =>
							dispatch(
								updateInvoice({
									senderAddress: {
										...invoiceData.senderAddress,
										country: newValue,
									},
								})
							)
						}
						error={validationErrors.senderAddressCountry}
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
						onChange={(newValue) =>
							dispatch(
								updateInvoice({
									clientName: newValue,
								})
							)
						}
						error={validationErrors.clientName}
					/>

					<InputField
						label="Client's Email"
						name="Client's Email"
						type="email"
						value={invoiceData.clientEmail}
						onChange={(newValue) =>
							dispatch(
								updateInvoice({
									clientEmail: newValue,
								})
							)
						}
						error={validationErrors.clientEmail}
					/>

					<InputField
						label="Street Address"
						name="Client's Address Street"
						type="text"
						value={invoiceData.clientAddress.street}
						onChange={(newValue) =>
							dispatch(
								updateInvoice({
									clientAddress: {
										...invoiceData.clientAddress,
										street: newValue,
									},
								})
							)
						}
						error={validationErrors.clientAddressStreet}
					/>

					<div className="flex gap-[23px]">
						<InputField
							label="City"
							name="Client's Address City"
							type="text"
							value={invoiceData.clientAddress.city}
							onChange={(newValue) =>
								dispatch(
									updateInvoice({
										clientAddress: {
											...invoiceData.clientAddress,
											city: newValue,
										},
									})
								)
							}
							error={validationErrors.clientAddressCity}
						/>

						<InputField
							label="Post Code"
							name="Client's Address Post Code"
							type="text"
							value={invoiceData.clientAddress.postCode}
							onChange={(newValue) =>
								dispatch(
									updateInvoice({
										clientAddress: {
											...invoiceData.clientAddress,
											postCode: newValue,
										},
									})
								)
							}
							error={validationErrors.clientAddressPostCode}
						/>
					</div>

					<InputField
						label="Country"
						name="Client's Address Country"
						type="text"
						value={invoiceData.clientAddress.country}
						onChange={(newValue) =>
							dispatch(
								updateInvoice({
									clientAddress: {
										...invoiceData.clientAddress,
										country: newValue,
									},
								})
							)
						}
						error={validationErrors.clientAddressCountry}
					/>

					<InputField
						label="Invoice Start Date"
						name="Invoice Date"
						type="date"
						value={invoiceData.createdAt}
						onChange={(newValue) =>
							dispatch(
								updateInvoice({
									createdAt: formatDateFromArray(
										new String(newValue).split(" ")
									),
								})
							)
						}
						error={validationErrors.createdAt}
						isEdit={isEdit}
					/>

					<InputField
						label="Payment Terms"
						name="Payment Terms"
						type="number"
						value={invoiceData.paymentTerms}
						onChange={(newValue) =>
							dispatch(
								updateInvoice({
									paymentTerms: newValue,
								})
							)
						}
						error={validationErrors.paymentTerms}
					/>

					<InputField
						label="Project Description"
						name="Project Description"
						type="text"
						value={invoiceData.description}
						onChange={(newValue) =>
							dispatch(
								updateInvoice({
									description: newValue,
								})
							)
						}
						error={validationErrors.description}
					/>
				</div>

				<div className="mb-[40px]">
					<p className="font-bold text-[18px] tracking-[-0.38px] text-[#777F98] leading-[32px] mb-[24px]">
						Item List
					</p>

					{invoiceData.items.map((item, index) => {
						const baseKey = `item${index}`;

						const nameErrorKey = `${baseKey}Name`;
						const quantityErrorKey = `${baseKey}Quantity`;
						const priceErrorKey = `${baseKey}Price`;

						const displayQuantity = item.quantity
							? Number(item.quantity).toString()
							: "";

						const displayPrice = item.price
							? Number(item.price).toString()
							: "";
						return (
							<div key={index} className="mb-[24px]">
								<InputField
									label="Item Name"
									name={`${baseKey}Name`}
									type="text"
									value={item.name}
									onChange={(e) => handleItemChange(index, "name", e)}
									error={validationErrors[nameErrorKey]}
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
												value={parseInt(
													String(item.quantity).replace(/^0+/, "")
												)}
												onChange={(e) => handleItemChange(index, "quantity", e)}
											/>
											{validationErrors[quantityErrorKey] && (
												<p style={{ color: "red" }}>
													{validationErrors[quantityErrorKey]}
												</p>
											)}
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
												value={parseInt(String(item.price).replace(/^0+/, ""))}
												onChange={(e) => handleItemChange(index, "price", e)}
											/>
											{validationErrors[priceErrorKey] && (
												<p style={{ color: "red" }}>
													{validationErrors[priceErrorKey]}
												</p>
											)}
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

										<div className="flex flex-col w-full items-end cursor-pointer">
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

			{/* Display error if items array is empty */}
			{validationErrors.items && (
				<div style={{ color: "red", marginTop: "10px" }}>
					{validationErrors.items}
				</div>
			)}

			{Object.keys(validationErrors).length !== 0 && (
				<div style={{ color: "red", marginTop: "10px" }}>
					There is a problem. Please review
				</div>
			)}
		</>
	);
}
