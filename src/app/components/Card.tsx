type CardProps = {
	children: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
	className?: string;
};

export default function Card({ children, onClick, className }: CardProps) {
	const isClickable = onClick !== undefined;

	return (
		// <div
		// 	onClick={onClick}
		// 	className={`bg-[#ffffff] p-[24px] rounded-[8px] transition-transform duration-150 ease-out ${
		// 		isClickable ? "cursor-pointer hover:scale-105 active:scale-95" : ""
		// 	}`}
		// >
		// 	{children}
		// </div>

		<div
			onClick={onClick}
			className={`p-[24px] rounded-[8px] transition-transform duration-150 ease-out ${
				isClickable
					? "cursor-pointer hover:scale-104 active:scale-95 shadow-custom"
					: ""
			} ${className !== undefined ? className : ""}`}
		>
			{children}
		</div>
	);
}
