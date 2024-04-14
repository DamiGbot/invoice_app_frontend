"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useTheme } from "@/app/context/themeContext";
import arrowLeft from "../../../../public/assets/icon-arrow-left.svg";
import Wrapper from "@/app/components/Wrapper";
import { InvoiceParams } from "@/app/types/Params";
import InvoiceActions from "@/app/components/InvoiceActions";
import { useResponsive } from "@/app/context/ResponsiveContext";

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

	const goBackHandler = () => {
		dispatch(resetInvoice());
		dispatch(clearValidationErrors());
		router.back();
	};

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
				<InvoiceActions className="justify-between p-[24px]" params={params} />
			)}
		</>
	);
}
