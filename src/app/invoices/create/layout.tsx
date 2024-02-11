"use client";

import Image from "next/image";
import { useTheme } from "@/app/context/themeContext";

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
	const { isLight } = useTheme();
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

					<div
						className={`font-bold text-[12px] tracking-[-0.25px] ${
							isLight ? "text-[#0C0E16] " : "text-[#fff]"
						} leading-[15px]`}
					>
						Go back
					</div>
				</div>

				{children}
			</Wrapper>

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
		</>
	);
}
