"use client";

import Image from "next/image";
import { useTheme } from "@/app/context/themeContext";

import { useRouter, usePathname } from "next/navigation";
import arrowLeft from "../../../../public/assets/icon-arrow-left.svg";
import Wrapper from "@/app/components/Wrapper";
import Button from "@/app/components/UI/Button";
import { InvoiceParams } from "@/app/types/Params";
import { useResponsive } from "@/app/context/ResponsiveContext";

import { useSelector } from "react-redux";
import { useDispatch } from "@/app/hooks/useDispatch";
import { RootState } from "@/app/lib/store";
import {
	addItem,
	deleteItem,
	updateInvoice,
	submitInvoice,
	resetInvoice,
} from "@/app/lib/features/invoices/invoiceSlice";

type InvoiceLayoutProps = {
	children: React.ReactNode;
	params: InvoiceParams;
};

export default function InvoiceLayout({
	children,
	params,
}: InvoiceLayoutProps) {
	const router = useRouter();
	const { currentInvoice } = useSelector((state: RootState) => state.invoice);
	const dispatch = useDispatch();
	const { isLight } = useTheme();
	const { isMobile } = useResponsive();

	const currentId = params.invoiceId;

	const goBackHandler = () => {
		router.back();
	};

	const markAsPaidHandler = () => {
		router.push("/edit");
	};

	const cancelHandler = () => {
		router.push(`/invoices/${currentId}`);
	};

	let invoiceActions = (
		<footer
			className={`shadow-top ${
				isLight ? "bg-[#ffffff] " : "bg-[#1E2139]"
			} p-[24px] flex justify-between items-center font-bold text-[12px] tracking-[-0.25px] leading-[15px]`}
		>
			<Button
				onClick={cancelHandler}
				createPage={true}
				className={`px-[16px] ${
					isLight
						? "bg-[#F9FAFE] text-[#7E88C3]"
						: "bg-[#252945] text-[#DFE3FA]"
				}`}
			>
				Discard
			</Button>
			<Button
				onClick={cancelHandler}
				createPage={true}
				className={`px-[16px] ${
					isLight
						? "bg-[#373B53] text-[#888EB0]"
						: "bg-[#373B53] text-[#DFE3FA]"
				}`}
			>
				Save as Draft
			</Button>
			<Button
				onClick={markAsPaidHandler}
				createPage={true}
				className="bg-[#7C5DFA] text-[#FFFFFF] px-[16px]"
			>
				Save & Send
			</Button>
		</footer>
	);

	if (!isMobile) {
		invoiceActions = (
			<div
				className={` p-[24px] flex justify-between items-center font-bold text-[12px] tracking-[-0.25px] leading-[15px]`}
			>
				<Button
					onClick={cancelHandler}
					createPage={true}
					className={`px-[16px] ${
						isLight
							? "bg-[#F9FAFE] text-[#7E88C3]"
							: "bg-[#252945] text-[#DFE3FA]"
					}`}
				>
					Discard
				</Button>

				<div className="flex gap-x-[8px]">
					<Button
						onClick={cancelHandler}
						createPage={true}
						className={`px-[16px] ${
							isLight
								? "bg-[#373B53] text-[#888EB0]"
								: "bg-[#373B53] text-[#DFE3FA]"
						}`}
					>
						Save as Draft
					</Button>
					<Button
						onClick={markAsPaidHandler}
						createPage={true}
						className="bg-[#7C5DFA] text-[#FFFFFF] px-[16px]"
					>
						Save & Send
					</Button>
				</div>
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

				{!isMobile && invoiceActions}
			</Wrapper>

			{isMobile && invoiceActions}
		</>
	);
}
