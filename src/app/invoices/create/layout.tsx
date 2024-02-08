"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import arrowLeft from "../../../../public/assets/icon-arrow-left.svg";
import Wrapper from "@/app/components/Wrapper";
import Button from "@/app/components/UI/Button";
import { InvoiceParams } from "@/app/types/Params";

type InvoiceLayoutProps = {
	children: React.ReactNode;
	params: InvoiceParams;
};

export default function InvoiceLayout({
	children,
	params,
}: InvoiceLayoutProps) {
	const router = useRouter();
	const pathString = usePathname();
	const isEdit = pathString.split("/")[3] === "edit";

	const currentId = params.invoiceId;

	const goBackHandler = () => {
		router.back();
	};

	const editHandler = () => {
		router.push(`/invoices/${currentId}/edit`);
	};

	const deleteHandler = () => {
		router.push("/edit");
	};

	const markAsPaidHandler = () => {
		router.push("/edit");
	};

	const cancelHandler = () => {
		router.push(`/invoices/${currentId}`);
	};

	return (
		<>
			<Wrapper>
				<div
					onClick={goBackHandler}
					className="flex items-center bounce-effect"
				>
					<span className="mr-[12px]">
						<Image src={arrowLeft} alt="arrow Down" />
					</span>

					<div className="font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]">
						Go back
					</div>
				</div>

				{children}
			</Wrapper>

			<footer
				className={`shadow-top bg-[#ffffff] p-[24px] flex gap-[7px] justify-between items-center font-bold text-[12px] tracking-[-0.25px] leading-[15px]`}
			>
				<Button
					onClick={cancelHandler}
					className="bg-[#F9FAFE] text-[#7E88C3] px-[16px]"
				>
					Discard
				</Button>
				<Button
					onClick={cancelHandler}
					className="bg-[#373B53] text-[#888EB0] px-[16px]"
				>
					Save as Draft
				</Button>
				<Button
					onClick={markAsPaidHandler}
					className="bg-[#7C5DFA] text-[#FFFFFF] px-[16px]"
				>
					Save & Send
				</Button>
			</footer>
		</>
	);
}
