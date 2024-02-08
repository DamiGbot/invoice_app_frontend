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

			{isEdit ? (
				<footer
					className={`shadow-top w-full bg-[#ffffff] p-[24px] flex gap-[8px] justify-end items-center`}
				>
					<Button
						onClick={cancelHandler}
						className="bg-[#F9FAFE] text-[#7E88C3]"
					>
						Cancel
					</Button>
					<Button
						onClick={markAsPaidHandler}
						className="bg-[#7C5DFA] text-[#FFFFFF]"
					>
						Save Changes
					</Button>
				</footer>
			) : (
				<footer
					className={`bg-[#ffffff] p-[24px] flex justify-between items-center`}
				>
					<Button onClick={editHandler} className="bg-[#F9FAFE] text-[#7E88C3]">
						Edit
					</Button>
					<Button onClick={deleteHandler} className="bg-[#EC5757] text-[#FFFF]">
						Delete
					</Button>
					<Button
						onClick={markAsPaidHandler}
						className="bg-[#7C5DFA] text-[#FFFFFF]"
					>
						Mark as Paid
					</Button>
				</footer>
			)}
		</>
	);
}
