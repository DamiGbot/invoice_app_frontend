"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import arrowDown from "../../../public/assets/icon-arrow-down.svg";
import arrowRight from "../../../public/assets/icon-arrow-right.svg";
import plus from "../../../public/assets/icon-plus.svg";
// import data from "../helpers/data.json";
import illustrationEmpty from "../../../public/assets/illustration-empty.svg";

import Card from "./Card";
import { useTheme } from "../context/themeContext";
import InvoiceStatus from "./UI/InvoiceStatus";
import { Invoice } from "../types/Invoice";
import { formatDate } from "../helpers/formatDate";
import Link from "next/link";
import { useResponsive } from "../context/ResponsiveContext";

import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import { useEffect, useState } from "react";
import apiInstance from "../api/axios";
import axios from "axios";
import LoadingComponent from "./UI/Loading";

export default function InvoiceList() {
	// using this to test the no invoice state, remember to delete this
	// data.length = 0;

	const router = useRouter();
	const { isMobile, isTablet, isDesktop } = useResponsive();
	const { isLight } = useTheme();
	const [data, setData] = useState<Invoice[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const { userId } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		const fetchInvoices = async () => {
			try {
				const accessToken = localStorage.getItem("accessToken");
				const response = await apiInstance.get(`/invoice/get-all-invoice`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				if (response.data.result === null) {
					setData([]);
				} else {
					setData(response.data.result);
				}

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
	}, [userId]);

	const invoiceClickHanlder = (id: string) => {
		console.log("working");
		setLoading(true);
		router.push(`/invoices/${id}`);
		setLoading(false);
	};

	if (loading) return <LoadingComponent />;
	// if (error) return <div>Error: {error}</div>;

	return (
		<>
			{/* {isMobile && <h1 className="text-[#fff]">This is Mobile View</h1>}
			{isTablet && <h1 className="text-[#fff]">This is Tablet View</h1>}
			{isDesktop && <h1 className="text-[#fff]">This is Desktop View</h1>} */}

			{/* Top section of the invoicelist */}
			<section>
				<div className="flex flex-row items-center justify-between">
					<div>
						<p
							className={`font-bold ${
								isLight ? "text-[#0C0E16]" : "text-[#fff]"
							} ${
								isMobile
									? "text-[20px] tracking-[-0.63px]"
									: isTablet
									? "text-[32px] tracking-[-1px]"
									: "text-[32px] tracking-[-1px]"
							}`}
						>
							Invoices
						</p>
						<p
							className={`font-medium text-[12px] tracking-[-0.25px]  ${
								isLight ? "text-[#888EB0]" : "text-[#DFE3FA]"
							}`}
						>
							{!isMobile && data.length > 0 && "There are "}{" "}
							{data.length === 0 ? "No" : data.length}{" "}
							{!isMobile && data.length > 0 && "total "} invoices
						</p>
					</div>

					<div className="flex flex-row">
						<div className="flex items-center">
							<p
								className={`font-bold text-[12px] tracking-[-0.25px] ${
									isLight ? "text-[#0C0E16]" : "text-[#fff]"
								} leading-[15px]`}
							>
								Filter {!isMobile && "by status "}{" "}
							</p>
							<span className={`ml-[12px]`}>
								<Image src={arrowDown} alt="arrow Down" />
							</span>
						</div>

						<Link
							href="/invoices/create"
							className={`bg-[#7C5DFA] flex items-center p-[8px] rounded-[24px] gap-[8px] ${
								isMobile ? "ml-[18px]" : "ml-[40px]"
							}`}
						>
							<div className="bg-[#FFFFFF] w-[32px] h-[32px] rounded-full flex items-center justify-center">
								<Image src={plus} alt="d" />
							</div>
							<p className="font-bold text-[#FFFFFF]">
								New {!isMobile && "Invoice "}{" "}
							</p>
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
					<>
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
								className={`font-medium text-[12px] tracking-[-0.25px]  ${
									isLight ? "text-[#888EB0]" : "text-[#DFE3FA]"
								} leading-[15px]`}
							>
								Create {isMobile && "an "} {!isMobile && "a new "} invoice by
								cliking the <br />
								<span className="font-bold">
									New {!isMobile && "Invoice "}{" "}
								</span>{" "}
								button and get started
							</p>
						</div>

						{error && <div>Error: {error}</div>}
					</>
				) : (
					data.map((item: Invoice, index) => {
						if (isMobile) {
							return (
								<Card
									className={`p-[24px] ${
										index === data.length - 1 ? "mb-[6px]" : ""
									} ${isLight ? "bg-[#ffffff] " : "bg-[#1E2139]"}`}
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
												{item.frontendId}
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
						} else {
							return (
								<Card
									className={`flex justify-between items-center p-[24px] ${
										index === data.length - 1 ? "mb-[6px]" : ""
									} ${isLight ? "bg-[#ffffff] " : "bg-[#1E2139]"}`}
									key={item.id}
									onClick={() => invoiceClickHanlder(item.id)}
								>
									<p
										className={`font-bold text-[12px] tracking-[-0.25px] ${
											isLight ? "text-[#0C0E16]" : "text-[#fff]"
										}  leading-[15px]`}
									>
										<span className="text-[#7E88C3]">#</span>
										{item.frontendId}
									</p>
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
										className={`font-medium text-[12px] tracking-[-0.25px]  ${
											isLight ? "text-[#858BB2]" : "text-[#fff]"
										} leading-[15px]`}
									>
										{item.clientName}
									</p>{" "}
									<p
										className={`font-bold text-[16px] tracking-[-0.8px] ${
											isLight ? "text-[#0C0E16]" : "text-[#fff]"
										} leading-[24px]`}
									>
										&#163; {item.total}{" "}
									</p>
									<InvoiceStatus status={item.status} />
									<Image src={arrowRight} alt="arrow Down" />
								</Card>
							);
						}
					})
				)}
			</section>
		</>
	);
}
