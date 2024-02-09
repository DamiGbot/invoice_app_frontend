"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import { useTheme } from "@/app/context/themeContext";
import arrowLeft from "../../../../public/assets/icon-arrow-left.svg";
import Wrapper from "@/app/components/Wrapper";
import Button from "@/app/components/UI/Button";
import { InvoiceParams } from "@/app/types/Params";
import Modal from "@/app/components/UI/Modal";
import Card from "@/app/components/Card";

type InvoiceLayoutProps = {
	children: React.ReactNode;
	params: InvoiceParams;
};

export default function InvoiceLayout({
	children,
	params,
}: InvoiceLayoutProps) {
	const [isModalOpen, setModalOpen] = useState(false);
	const router = useRouter();
	const pathString = usePathname();
	const { isLight } = useTheme();

	const isEdit = pathString.split("/")[3] === "edit";

	const currentId = params.invoiceId;

	const goBackHandler = () => {
		router.back();
	};

	const editHandler = () => {
		router.push(`/invoices/${currentId}/edit`);
	};

	const deleteHandler = () => {
		setModalOpen(true);
		document.body.style.overflow = "hidden";
	};

	const closeModal = () => {
		setModalOpen(false);
		// Optionally, reset scrolling behavior when modal closes
		document.body.style.overflow = "auto";
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

			{isModalOpen && (
				<Modal isOpen={isModalOpen} onClose={closeModal}>
					<Card
						className={`mx-[24px] p-[32px] ${
							isLight ? "bg-[#ffffff] " : "bg-[#1E2139]"
						}`}
					>
						<p
							className={`mb-[8px] font-bold text-[20px] tracking-[-0.42px] ${
								isLight ? "text-[#0C0E16]" : "text-[#fff]"
							} leading-[32px]`}
						>
							Confirm Deletion
						</p>
						<p className="mb-[24px] font-medium text-[12px] tracking-[-0.25px] text-[#888EB0] leading-[22px]">{`Are you sure you want to delete invoice #${currentId}? This action cannot be undone.`}</p>

						<div className="flex gap-[8px] justify-end items-center">
							<Button
								onClick={closeModal}
								className={`${
									isLight
										? "bg-[#F9FAFE] text-[#7E88C3]"
										: "bg-[#252945] text-[#DFE3FA]"
								}`}
							>
								Cancel
							</Button>
							<Button
								onClick={deleteHandler} // This should do the final delete
								className="bg-[#EC5757] text-[#FFFF]"
							>
								Delete
							</Button>
						</div>
					</Card>
				</Modal>
			)}

			{isEdit ? (
				<footer
					className={`shadow-top w-full ${
						isLight ? "bg-[#ffffff] " : "bg-[#1E2139]"
					} p-[24px] flex gap-[8px] justify-end items-center`}
				>
					<Button
						onClick={cancelHandler}
						className={`${
							isLight
								? "bg-[#F9FAFE] text-[#7E88C3]"
								: "bg-[#252945] text-[#DFE3FA]"
						}`}
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
					className={`${
						isLight ? "bg-[#ffffff] " : "bg-[#1E2139]"
					} p-[24px] flex justify-between items-center`}
				>
					<Button
						onClick={editHandler}
						className={`${
							isLight
								? "bg-[#F9FAFE] text-[#7E88C3]"
								: "bg-[#252945] text-[#DFE3FA]"
						}`}
					>
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
