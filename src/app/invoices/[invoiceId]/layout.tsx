"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useTheme } from "@/app/context/themeContext";
import arrowLeft from "../../../../public/assets/icon-arrow-left.svg";
import Wrapper from "@/app/components/Wrapper";
import { InvoiceParams } from "@/app/types/Params";

import InvoiceActions from "@/app/components/InvoiceActions";
import { useResponsive } from "@/app/context/ResponsiveContext";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import { updateInvoice } from "@/app/lib/features/invoices/invoiceSlice";

import apiInstance from "../../api/axios";
import ErrorModal from "@/app/components/UI/Error";
import LoadingComponent from "@/app/components/UI/Loading";
import axios from "axios";

import {
	resetInvoice,
	clearValidationErrors,
} from "@/app/lib/features/invoices/invoiceSlice";
import { useDispatch } from "@/app/hooks/useDispatch";
import { Invoice } from "@/app/types/Invoice";

type InvoiceLayoutProps = {
	children: React.ReactNode;
	params: InvoiceParams;
};

export default function InvoiceLayout({
	children,
	params,
}: InvoiceLayoutProps) {
	const router = useRouter();
	const { isLight } = useTheme();
	const { isMobile } = useResponsive();
	const pathString = usePathname();
	const dispatch = useDispatch();
	const { currentInvoice } = useSelector((state: RootState) => state.invoice);
	const [loading, setLoading] = useState<boolean>(true);
	const [invoiceData, setData] = useState<Invoice | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isEdit, setIsEdit] = useState<boolean>(false);

	const currentId = params.invoiceId;

	useEffect(() => {
		setIsEdit(pathString.split("/")[3] === "edit");
		const fetchInvoices = async () => {
			try {
				const accessToken = localStorage.getItem("accessToken");
				const response = await apiInstance.get(`/invoice/${currentId}`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				dispatch(updateInvoice(response.data.result));

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
	}, [currentId, pathString]);

	const goBackHandler = () => {
		dispatch(resetInvoice());
		dispatch(clearValidationErrors());

		if (isEdit) {
			router.push(`/invoices/${currentId}`);
		} else {
			router.push(`/invoices`);
		}
	};

	const markAsPaidRequest = async () => {
		setLoading(true);
		try {
			const accessToken = localStorage.getItem("accessToken");
			const response = await apiInstance.post(
				`/invoice/${currentId}/mark-as-paid`,
				{},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (invoiceData) {
				setData({ ...invoiceData, status: "paid" });
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

	const markAsPendingRequest = async () => {
		setLoading(true);
		try {
			const accessToken = localStorage.getItem("accessToken");
			const response = await apiInstance.post(
				`/invoice/${currentId}/mark-as-pending`,
				{},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (invoiceData) {
				setData({ ...invoiceData, status: "pending" });
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

	if (loading) return <LoadingComponent />;

	if (currentInvoice === null) {
		return (
			<div>
				{error && <ErrorModal errorMessage={error} />}
				Please go back to Invoice Page: <Link href="/invoices">click here</Link>
			</div>
		);
	}

	return (
		<>
			<Wrapper>
				<div className="inline-flex items-center">
					<div
						onClick={goBackHandler}
						className="flex items-center cursor-pointer bounce-effect"
					>
						<span className="mr-[12px]">
							<Image src={arrowLeft} alt="arrow Down" />
						</span>

						<p
							className={`font-bold text-[12px] tracking-[-0.25px] ${
								isLight ? "text-[#0C0E16]" : "text-[#fff]"
							} leading-[15px]`}
						>
							Go back
						</p>
					</div>
				</div>

				{children}
			</Wrapper>

			{isMobile && (
				<InvoiceActions
					className="justify-between p-[24px]"
					params={params}
					markAsPaidRequest={markAsPaidRequest}
					markAsPendingRequest={markAsPendingRequest}
					status={currentInvoice.status}
					frontendId={currentInvoice.frontendId}
				/>
			)}
		</>
	);
}
