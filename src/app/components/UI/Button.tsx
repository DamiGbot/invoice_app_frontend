type ButtonProp = {
	children: React.ReactNode;
	className?: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	type?: "button";
};

export default function Button({
	className,
	children,
	onClick,
	type,
}: ButtonProp) {
	const style =
		`pt-[17px] pb-[16px] px-[24px] rounded-full font-bold text-[12px] tracking-[-0.25px] leading-[15px] bounce-effect` +
		" " +
		className;

	return (
		<button onClick={onClick} className={style} type={type}>
			{children}
		</button>
	);
}
