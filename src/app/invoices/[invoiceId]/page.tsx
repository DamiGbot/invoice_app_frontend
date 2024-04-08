"use client";

import { useTheme } from "@/app/context/themeContext";

import Card from "@/app/components/Card";
import InvoiceStatus from "@/app/components/UI/InvoiceStatus";
import data from "../../helpers/data.json";
import { Invoice } from "@/app/types/Invoice";
import { formatDate } from "@/app/helpers/formatDate";
import { InvoiceParams } from "@/app/types/Params";
import { useResponsive } from "@/app/context/ResponsiveContext";

import InvoiceActions from "@/app/components/InvoiceActions";
import withAuth from "@/app/components/withAuth";

type InoviceDetailsProps = {
	params: InvoiceParams;
};

const InvoiceDetails = ({ params }: InoviceDetailsProps) => {
	const { isLight } = useTheme();
	const { isMobile } = useResponsive();

	// filter data by id
	const invoiceData = data.find((el) => el.id === params.invoiceId) as Invoice;
	// console.log(isMobile);

	let invoiceDataCard = (
		<Card
			className={`shadow-bottom mt-[16px] mb-[48px] p-[32px]
		${isLight ? "bg-[#ffffff] " : "bg-[#1E2139]"}`}
		>
			<div>
				<p
					className={`font-bold text-[12px] tracking-[-0.25px] ${
						isLight ? "text-[#0C0E16]" : "text-[#fff]"
					} leading-[15px]`}
				>
					<span className="text-[#7E88C3]">#</span>
					{invoiceData.id}
				</p>
				<p
					className={`font-medium text-[12px] tracking-[-0.25px]  ${
						isLight ? "text-[#7E88C3]" : "text-[#DFE3FA]"
					} leading-[15px]`}
				>
					{invoiceData.description}
				</p>

				<p
					className={`font-medium text-[11px] tracking-[-0.23px] ${
						isLight ? "text-[#7E88C3]" : "text-[#DFE3FA]"
					} leading-[18px] mt-[30px]`}
				>
					{invoiceData.senderAddress.street}
					<br />
					{invoiceData.senderAddress.city}
					<br />
					{invoiceData.senderAddress.postCode}
					<br />
					{invoiceData.senderAddress.country}
				</p>
			</div>

			<div className="flex gap-[41px] mt-[31px]">
				<div>
					<p
						className={`font-medium text-[11px] tracking-[-0.23px] ${
							isLight ? "text-[#7E88C3]" : "text-[#DFE3FA]"
						} leading-[18px]`}
					>
						Invoice Date
					</p>
					<p
						className={`mt-[12px] font-bold text-[15px] tracking-[-0.31px] ${
							isLight ? "text-[#0C0E16]" : "text-[#fff]"
						} leading-[20px]`}
					>
						{formatDate(invoiceData.createdAt)}
					</p>

					<p
						className={`font-medium text-[11px] tracking-[-0.23px] ${
							isLight ? "text-[#7E88C3]" : "text-[#DFE3FA]"
						} leading-[18px] mt-[30px]`}
					>
						Payment Due
					</p>
					<p
						className={`mt-[12px] font-bold text-[15px] tracking-[-0.31px] ${
							isLight ? "text-[#0C0E16]" : "text-[#fff]"
						} leading-[20px]`}
					>
						{formatDate(invoiceData.paymentDue)}
					</p>
				</div>

				<div>
					<p
						className={`font-medium text-[11px] tracking-[-0.23px] ${
							isLight ? "text-[#7E88C3]" : "text-[#DFE3FA]"
						} leading-[18px]`}
					>
						Bill To
					</p>
					<p
						className={`mt-[12px] font-bold text-[15px] tracking-[-0.31px] ${
							isLight ? "text-[#0C0E16]" : "text-[#fff]"
						} leading-[20px]`}
					>
						{invoiceData.clientName}
					</p>

					<p
						className={`mt-[8px] font-medium text-[11px] tracking-[-0.23px] ${
							isLight ? "text-[#7E88C3]" : "text-[#DFE3FA]"
						} leading-[18px]`}
					>
						{invoiceData.clientAddress.street}
						<br />
						{invoiceData.clientAddress.city}
						<br />
						{invoiceData.clientAddress.postCode}
						<br />
						{invoiceData.clientAddress.country}
					</p>
				</div>
			</div>

			<div className="mt-[32px]">
				<p
					className={`font-medium text-[11px] tracking-[-0.23px] ${
						isLight ? "text-[#7E88C3]" : "text-[#DFE3FA]"
					} leading-[18px]`}
				>
					Sent to
				</p>
				<p
					className={`mt-[12px] font-bold text-[15px] tracking-[-0.31px] ${
						isLight ? "text-[#0C0E16]" : "text-[#fff]"
					} leading-[20px]`}
				>
					{invoiceData.clientEmail}
				</p>
			</div>

			<div
				className={`${
					isLight ? "bg-[#F9FAFE]" : "bg-[#252945]"
				} mt-[40px] p-[24px] rounded-t-[8px]`}
			>
				<div className="flex flex-col gap-[24px]">
					{invoiceData.items.map((item) => {
						return (
							<div
								key={item.name}
								className="flex justify-between items-center"
							>
								<div>
									<p
										className={`font-bold text-[12px] tracking-[-0.25px] ${
											isLight ? "text-[#0C0E16]" : "text-[#fff]"
										} leading-[15px]`}
									>
										{item.name}
									</p>
									<p
										className={`mt-[8px] font-bold text-[12px] tracking-[-0.25px] ${
											isLight ? "text-[#7E88C3]" : "text-[#888EB0]"
										} leading-[15px]`}
									>
										{item.quantity} x &#163; {item.price}
									</p>
								</div>
								<div>
									<p
										className={`font-bold text-[12px] tracking-[-0.25px] ${
											isLight ? "text-[#0C0E16]" : "text-[#fff]"
										} leading-[15px]`}
									>
										&#163; {item.total}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<div
				className={`${
					isLight ? "bg-[#373B53]" : "bg-[#0C0E16]"
				} p-[24px] text-[#ffffff] flex justify-between items-center rounded-b-[8px]`}
			>
				<p>Grand Total</p>
				<p className={`font-bold`}>&#163; {invoiceData.total}</p>
			</div>
		</Card>
	);

	if (!isMobile) {
		invoiceDataCard = (
			<Card
				className={`shadow-bottom mt-[16px] mb-[48px] p-[32px] 
				${isLight ? "bg-[#ffffff] " : "bg-[#1E2139]"}`}
			>
				<div className="flex justify-between">
					<div>
						<p
							className={`font-bold text-[16px] tracking-[-0.8px] ${
								isLight ? "text-[#0C0E16]" : "text-[#fff]"
							} leading-[24px]`}
						>
							<span className="text-[#7E88C3]">#</span>
							{invoiceData.id}
						</p>
						<p
							className={`font-medium text-[12px] tracking-[-0.25px]  ${
								isLight ? "text-[#7E88C3]" : "text-[#DFE3FA]"
							} leading-[15px] mt-[8px]`}
						>
							{invoiceData.description}
						</p>
					</div>

					<p
						className={`font-medium text-[11px] tracking-[-0.23px] ${
							isLight ? "text-[#7E88C3]" : "text-[#DFE3FA]"
						} leading-[18px] text-right`}
					>
						{invoiceData.senderAddress.street}
						<br />
						{invoiceData.senderAddress.city}
						<br />
						{invoiceData.senderAddress.postCode}
						<br />
						{invoiceData.senderAddress.country}
					</p>
				</div>

				<div className="flex gap-[98px] mt-[21px]">
					<div>
						<p
							className={`font-medium text-[12px] tracking-[-0.25px] ${
								isLight ? "text-[#7E88C3]" : "text-[#DFE3FA]"
							} leading-[15px]`}
						>
							Invoice Date
						</p>
						<p
							className={`mt-[12px] font-bold text-[15px] tracking-[-0.31px] ${
								isLight ? "text-[#0C0E16]" : "text-[#fff]"
							} leading-[20px]`}
						>
							{formatDate(invoiceData.createdAt)}
						</p>

						<p
							className={`font-medium text-[12px] tracking-[-0.25px] ${
								isLight ? "text-[#7E88C3]" : "text-[#DFE3FA]"
							} leading-[15px] mt-[30px]`}
						>
							Payment Due
						</p>
						<p
							className={`mt-[12px] font-bold text-[15px] tracking-[-0.31px] ${
								isLight ? "text-[#0C0E16]" : "text-[#fff]"
							} leading-[20px]`}
						>
							{formatDate(invoiceData.paymentDue)}
						</p>
					</div>

					<div>
						<p
							className={`font-medium text-[12px] tracking-[-0.25px] ${
								isLight ? "text-[#7E88C3]" : "text-[#DFE3FA]"
							} leading-[15px]`}
						>
							Bill To
						</p>
						<p
							className={`mt-[12px] font-bold text-[15px] tracking-[-0.31px] ${
								isLight ? "text-[#0C0E16]" : "text-[#fff]"
							} leading-[20px]`}
						>
							{invoiceData.clientName}
						</p>

						<p
							className={`mt-[8px] font-medium text-[11px] tracking-[-0.23px] ${
								isLight ? "text-[#7E88C3]" : "text-[#DFE3FA]"
							} leading-[18px]`}
						>
							{invoiceData.clientAddress.street}
							<br />
							{invoiceData.clientAddress.city}
							<br />
							{invoiceData.clientAddress.postCode}
							<br />
							{invoiceData.clientAddress.country}
						</p>
					</div>

					<div className="">
						<p
							className={`font-medium text-[12px] tracking-[-0.25px] ${
								isLight ? "text-[#7E88C3]" : "text-[#DFE3FA]"
							} leading-[15px]`}
						>
							Sent to
						</p>
						<p
							className={`mt-[12px] font-bold text-[15px] tracking-[-0.31px] ${
								isLight ? "text-[#0C0E16]" : "text-[#fff]"
							} leading-[20px]`}
						>
							{invoiceData.clientEmail}
						</p>
					</div>
				</div>

				<div
					className={`${
						isLight ? "bg-[#F9FAFE]" : "bg-[#252945]"
					} mt-[48px] px-[32px] pt-[32px] pb-[40px] rounded-t-[8px]`}
				>
					<div className="flex flex-col gap-y-[32px]">
						<div
							className={`grid grid-cols-[50%_50%] font-bold text-[12px] tracking-[-0.25px] ${
								isLight ? "text-[#7E88C3]" : "text-[#888EB0]"
							} leading-[15px]`}
						>
							<p className="">Item Name</p>
							<div className="flex items-center justify-end">
								<p style={{ marginRight: "55px" }}>Qty</p>
								<p style={{ marginRight: "74px" }}>Price</p>
								<p>Total</p>
							</div>
						</div>

						{invoiceData.items.map((item) => {
							return (
								<div key={item.name} className="grid grid-cols-[50%_50%]">
									<p
										className={`font-bold text-[12px] tracking-[-0.25px] ${
											isLight ? "text-[#0C0E16]" : "text-[#fff]"
										} leading-[15px]`}
									>
										{item.name}
									</p>
									<div className="flex items-center justify-end">
										<p
											className={`font-bold text-[12px] tracking-[-0.25px] ${
												isLight ? "text-[#7E88C3]" : "text-[#888EB0]"
											} leading-[15px]`}
											style={{ marginRight: "55px" }}
										>
											{item.quantity}
										</p>

										<p
											className={`font-bold text-[12px] tracking-[-0.25px] ${
												isLight ? "text-[#7E88C3]" : "text-[#888EB0]"
											} leading-[15px]`}
											style={{ marginRight: "74px" }}
										>
											&#163; {item.price}
										</p>

										<p
											className={`font-bold text-[12px] tracking-[-0.25px] ${
												isLight ? "text-[#0C0E16]" : "text-[#fff]"
											} leading-[15px]`}
										>
											&#163; {item.total}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* <div
					className={`${
						isLight ? "bg-[#F9FAFE]" : "bg-[#252945]"
					} mt-[48px] px-[32px] pt-[32px] pb-[40px] rounded-t-[8px]`}
				>
					<table className="min-w-full table-auto text-left">
						<thead>
							<tr
								className={`font-bold text-[12px] tracking-[-0.25px] ${
									isLight ? "text-[#7E88C3]" : "text-[#888EB0]"
								} leading-[15px]`}
							>
								<th className="">Item Name</th>
								<div className="">
									<th>Qty</th>
									<th>Price</th>
									<th>Total</th>
								</div>
							</tr>
						</thead>

						<tbody>
							{invoiceData.items.map((item, index) => (
								<tr key={index}>
									<td className={``}>{item.name}</td>
									<div className="">
										<td className={``}>{item.quantity}</td>
										<td className={``}>${item.price.toFixed(2)}</td>
										<td className={``}>${item.total.toFixed(2)}</td>
									</div>
								</tr>
							))}
						</tbody>

						{invoiceData.items.map((item) => {
							return (
								<div key={item.name} className="grid grid-cols-[50%_50%]">
									<p
										className={`font-bold text-[12px] tracking-[-0.25px] ${
											isLight ? "text-[#0C0E16]" : "text-[#fff]"
										} leading-[15px]`}
									>
										{item.name}
									</p>
									<div className="flex items-center justify-end">
										<p
											className={`font-bold text-[12px] tracking-[-0.25px] ${
												isLight ? "text-[#7E88C3]" : "text-[#888EB0]"
											} leading-[15px]`}
											style={{ marginRight: "55px" }}
										>
											{item.quantity}
										</p>

										<p
											className={`font-bold text-[12px] tracking-[-0.25px] ${
												isLight ? "text-[#7E88C3]" : "text-[#888EB0]"
											} leading-[15px]`}
											style={{ marginRight: "74px" }}
										>
											&#163; {item.price}
										</p>

										<p
											className={`font-bold text-[12px] tracking-[-0.25px] ${
												isLight ? "text-[#0C0E16]" : "text-[#fff]"
											} leading-[15px]`}
										>
											&#163; {item.total}
										</p>
									</div>
								</div>
							);
						})}
					</table>
				</div> */}

				<div
					className={`${
						isLight ? "bg-[#373B53]" : "bg-[#0C0E16]"
					} p-[24px] text-[#ffffff] flex justify-between items-center rounded-b-[8px]`}
				>
					<p className={`text-[11px]`}>Grand Total</p>
					<p
						className={`font-bold text-[24px] tracking-[-0.5px] leading-[32px]`}
					>
						&#163; {invoiceData.total}
					</p>
				</div>
			</Card>
		);
	}

	return (
		<>
			{/* Status */}
			{isMobile ? (
				<Card
					className={`flex flex-row items-center justify-between mt-[32px] p-[24px] ${
						isLight ? "bg-[#ffffff] " : "bg-[#1E2139]"
					}`}
				>
					<p
						className={`font-medium text-[15px] tracking-[-0.25px] ${
							isLight ? "text-[#858BB2]" : "text-[#DFE3FA]"
						} leading-[15px]`}
					>
						Status
					</p>
					<InvoiceStatus status="pending" />
				</Card>
			) : (
				<Card
					className={`shadow-bottom flex flex-row items-center justify-between mt-[32px] py-[20px] px-[32px] ${
						isLight ? "bg-[#ffffff] " : "bg-[#1E2139]"
					}`}
				>
					<div
						className={`flex flex-row items-center justify-between gap-[1rem]`}
					>
						<p
							className={`font-medium text-[15px] tracking-[-0.25px] ${
								isLight ? "text-[#858BB2]" : "text-[#DFE3FA]"
							} leading-[15px]`}
						>
							Status
						</p>
						<InvoiceStatus status="pending" />
					</div>

					<InvoiceActions className="gap-[0.5rem]" params={params} />
				</Card>
			)}

			{/* Invoice Data Card */}
			{invoiceDataCard}
		</>
	);
};

export default withAuth(InvoiceDetails);
