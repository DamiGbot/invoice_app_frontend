"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import arrowDown from "../../../public/assets/icon-arrow-down.svg";
import plus from "../../../public/assets/icon-plus.svg";
import data from "../helpers/data.json";
import illustrationEmpty from "../../../public/assets/illustration-empty.svg";

import Card from "./Card";
import { useTheme } from "../context/themeContext";
import InvoiceStatus from "./UI/InvoiceStatus";
import { Invoice } from "../types/Invoice";
import { formatDate } from "../helpers/formatDate";
import Link from "next/link";

export default function InvoiceList() {
	// using this to test the no invoice state, remember to delete this
	// data.length = 0;

	const router = useRouter();
	const { isLight } = useTheme();

	const invoiceClickHanlder = (id: string) => {
		console.log("working");

		router.push(`/invoices/${id}`);
	};

	return (
		<>
			{/* Top section of the invoicelist */}
			<section>
				<div className="flex flex-row items-center justify-between">
					<div>
						<p
							className={`font-bold text-[20px] tracking-[-0.63px] ${
								isLight ? "text-[#0C0E16]" : "text-[#fff]"
							}`}
						>
							Invoices
						</p>
						<p
							className={`font-medium text-[12px] tracking-[-0.25px]  ${
								isLight ? "text-[#888EB0]" : "text-[#DFE3FA]"
							}`}
						>
							<span>{data.length === 0 ? "No" : data.length}</span> invoices
						</p>
					</div>

					<div className="flex flex-row">
						<div className="flex items-center">
							<div
								className={`font-bold text-[12px] tracking-[-0.25px] ${
									isLight ? "text-[#0C0E16]" : "text-[#fff]"
								} leading-[15px]`}
							>
								Filter
							</div>
							<span className="ml-[12px]">
								<Image src={arrowDown} alt="arrow Down" />
							</span>
						</div>

						<Link
							href="/invoices/create"
							className="w-[90px] h-[44px] bg-[#7C5DFA] flex items-center p-[6px] rounded-[24px] ml-[18px] gap-[8px]"
						>
							<div className="bg-[#FFFFFF] w-[32px] h-[32px] rounded-full flex items-center justify-center">
								<Image src={plus} alt="d" />
							</div>
							<p className="text-[#FFFFFF]">New</p>
						</Link>
					</div>
				</div>
			</section>

			{/* Invoice list cards */}
			<section
				className={`section-container ${
					data.length > 0 ? "mt-[32px] mb-[32px] flex flex-col gap-[16px]" : ""
				}`}
			>
				{/* I want to have conditional rendering based on the data length */}

				{data.length === 0 ? (
					<div className="text-center h-full flex flex-1 flex-col justify-center items-center">
						<Image src={illustrationEmpty} alt="there is no ivoice" />
						<p
							className={`mt-[40px] mb-[24px] font-bold text-[20px] tracking-[-0.63px] ${
								isLight ? "text-[#0C0E16]" : "text-[#fff]"
							} `}
						>
							There is nothing here
						</p>
						<p
							className={`font-medium text-[15px] tracking-[-0.25px]  ${
								isLight ? "text-[#888EB0]" : "text-[#DFE3FA]"
							} leading-[15px]`}
						>
							Create an invoice by cliking the <br />
							<span className="font-bold">New</span> button and get started
						</p>
					</div>
				) : (
					data.map((item: Invoice, index) => {
						return (
							<Card
								className={`${index === data.length - 1 ? "mb-[6px]" : ""} ${
									isLight ? "bg-[#ffffff] " : "bg-[#1E2139]"
								}`}
								key={item.id}
								onClick={() => invoiceClickHanlder(item.id)}
							>
								{" "}
								{/* Add a unique key prop */}
								<div className="flex flex-col gap-[24px]">
									<div className="flex justify-between">
										<p
											className={`font-bold text-[12px] tracking-[-0.25px] ${
												isLight ? "text-[#0C0E16]" : "text-[#fff]"
											}  leading-[15px]`}
										>
											<span className="text-[#7E88C3]">#</span>
											{item.id}
										</p>
										<p
											className={`font-medium text-[12px] tracking-[-0.25px]  ${
												isLight ? "text-[#858BB2]" : "text-[#fff]"
											} leading-[15px]`}
										>
											{item.clientName}
										</p>
									</div>

									<div className="flex justify-between">
										<div>
											<div>
												<p
													className={`font-medium text-[12px] tracking-[-0.25px]  ${
														isLight ? "text-[#7E88C3]" : "text-[#DFE3FA]"
													} leading-[15px]`}
												>
													<span
														className={`${
															isLight ? "text-[#888EB0]" : "text-[#DFE3FA]"
														}`}
													>
														Due
													</span>{" "}
													{formatDate(item.paymentDue)}
												</p>
												<p
													className={`font-bold text-[16px] tracking-[-0.8px] ${
														isLight ? "text-[#0C0E16]" : "text-[#fff]"
													} leading-[24px]`}
												>
													&#163; {item.total}{" "}
												</p>
											</div>
										</div>

										<InvoiceStatus status={item.status} />
									</div>
								</div>
							</Card>
						);
					})
				)}
			</section>
		</>
	);
}
