"use client";

import { useRouter } from "next/navigation";

import arrowDown from "../../../public/assets/icon-arrow-down.svg";
import plus from "../../../public/assets/icon-plus.svg";
import data from "../helpers/data.json";
import illustrationEmpty from "../../../public/assets/illustration-empty.svg";

import Image from "next/image";
import Card from "./Card";
import InvoiceStatus from "./UI/InvoiceStatus";
import { Invoice } from "../types/Invoice";
import { formatDate } from "../helpers/formatDate";

export default function InvoiceList() {
	// using this to test the no invoice state, remember to delete this
	// data.length = 0;
	const router = useRouter();

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
						<p className="font-bold text-[20px] tracking-[-0.63px] text-[#0C0E16]">
							Invoices
						</p>
						<p className="font-medium text-[12px] tracking-[-0.25px] text-[#888EB0]">
							<span>{data.length === 0 ? "No" : data.length}</span> invoices
						</p>
					</div>

					<div className="flex flex-row">
						<div className="flex items-center">
							<div className="font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]">
								Filter
							</div>
							<span className="ml-[12px]">
								<Image src={arrowDown} alt="arrow Down" />
							</span>
						</div>

						<div className="w-[90px] h-[44px] bg-[#7C5DFA] flex items-center p-[6px] rounded-[24px] ml-[18px] gap-[8px]">
							<div className="bg-[#FFFFFF] w-[32px] h-[32px] rounded-full flex items-center justify-center">
								<Image src={plus} alt="d" />
							</div>
							<p className="text-[#FFFFFF]">New</p>
						</div>
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
						<p className="mt-[40px] mb-[24px] font-bold text-[20px] tracking-[-0.63px] text-[#0C0E16]">
							There is nothing here
						</p>
						<p className="font-medium text-[15px] tracking-[-0.25px] text-[#888EB0] leading-[15px]">
							Create an invoice by cliking the <br />
							<span className="font-bold">New</span> button and get started
						</p>
					</div>
				) : (
					data.map((item: Invoice, index) => {
						return (
							<Card
								className={`${index === data.length - 1 ? "mb-[6px]" : ""}`}
								key={item.id}
								onClick={() => invoiceClickHanlder(item.id)}
							>
								{" "}
								{/* Add a unique key prop */}
								<div className="flex flex-col gap-[24px]">
									<div className="flex justify-between">
										<p className="font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]">
											<span className="text-[#7E88C3]">#</span>
											{item.id}
										</p>
										<p className="font-medium text-[12px] tracking-[-0.25px] text-[#858BB2] leading-[15px]">
											{item.clientName}
										</p>
									</div>

									<div className="flex justify-between">
										<div>
											<div>
												<p className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px]">
													<span className="text-[#888EB0]">Due</span>{" "}
													{formatDate(item.paymentDue)}
												</p>
												<p className="font-bold text-[16px] tracking-[-0.8px] text-[#0C0E16] leading-[24px]">
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
