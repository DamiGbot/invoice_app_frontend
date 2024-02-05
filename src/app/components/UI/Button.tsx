type ButtonProp = {
	children: React.ReactNode;
	className?: string;
};

export default function Button({ className, children }: ButtonProp) {
	const style =
		`pt-[17px] pb-[16px] px-[24px] rounded-full font-bold text-[12px] tracking-[-0.25px] leading-[15px] bounce-effect` +
		" " +
		className;

	return <div className={style}>{children}</div>;
}
