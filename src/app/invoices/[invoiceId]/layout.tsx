"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
	const dispatch = useDispatch();
	const { currentInvoice } = useSelector((state: RootState) => state.invoice);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const currentId = params.invoiceId;

	useEffect(() => {
		const fetchInvoices = async () => {
			try {
				const accessToken = localStorage.getItem("accessToken");
				const response = await apiInstance.get(`/invoice/${currentId}`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				console.log(response.data.result);

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
	}, [currentId]);

	const goBackHandler = () => {
		dispatch(resetInvoice());
		dispatch(clearValidationErrors());
		router.back();
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
					status={currentInvoice.status}
					frontendId={currentInvoice.frontendId}
				/>
			)}
		</>
	);
}
