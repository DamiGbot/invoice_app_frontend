"use client";

import { useTheme } from "@/app/context/themeContext";

type InvoiceStatusProps = {
	status: string;
};

export default function InvoiceStatus({ status }: InvoiceStatusProps) {
	const { isLight } = useTheme();

	const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);

	return (
		<div
			className={`w-[104px] h-[40px] flex justify-center items-center rounded-[6px] ${
				capitalizedStatus === "Paid"
					? "bg-[#33D69F] text-[#33D69F] bg-opacity-10"
					: capitalizedStatus === "Pending"
					? "bg-[#FF8F00] text-[#FF8F00] bg-opacity-10"
					: capitalizedStatus === "Draft"
					? `bg-[#373B53] ${
							isLight
								? "bg-[#373B53] text-[#373B53]"
								: "bg-[#DFE3FA] text-[#DFE3FA]"
					  } bg-opacity-10`
					: "" // Default style if status doesn't match
			}`}
		>
			<div
				className={`w-[8px] h-[8px] rounded-full mr-[8px] ${
					capitalizedStatus === "Paid"
						? "bg-[#33D69F] bg-opacity-100"
						: capitalizedStatus === "Pending"
						? "bg-[#FF8F00] bg-opacity-100"
						: capitalizedStatus === "Draft"
						? `${isLight ? "bg-[#373B53]" : "bg-[#DFE3FA]"} bg-opacity-100`
						: "" // Default style if status doesn't match
				}`}
			></div>
			<p className="font-bold text-[12px] tracking-[-0.25px] leading-[15px]">
				{capitalizedStatus}
			</p>
		</div>
	);
}
