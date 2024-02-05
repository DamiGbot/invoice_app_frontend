"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import arrowLeft from "../../../../public/assets/icon-arrow-left.svg";
import Wrapper from "@/app/components/Wrapper";
import Button from "@/app/components/UI/Button";

export default function InvoiceLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();

	const goBackHandler = () => {
		router.back();
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
				className={`bg-[#ffffff] p-[24px] flex justify-between items-center`}
			>
				<Button className="bg-[#F9FAFE] text-[#7E88C3]">Edit</Button>
				<Button className="bg-[#EC5757] text-[#FFFF]">Delete</Button>
				<Button className="bg-[#7C5DFA] text-[#FFFFFF]">Mark as Paid</Button>
			</footer>
		</>
	);
}
