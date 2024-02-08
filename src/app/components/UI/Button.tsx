type ButtonProp = {
	children: React.ReactNode;
	className?: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({ className, children, onClick }: ButtonProp) {
	const style =
		`pt-[17px] pb-[16px] px-[24px] rounded-full font-bold text-[12px] tracking-[-0.25px] leading-[15px] bounce-effect` +
		" " +
		className;

	return (
		<button onClick={onClick} className={style}>
			{children}
		</button>
	);
}
