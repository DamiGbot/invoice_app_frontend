import { create } from "domain";

type ButtonProp = {
	children: React.ReactNode;
	className?: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	type?: "button";
	createPage?: boolean;
};

export default function Button({
	className,
	children,
	onClick,
	type,
	createPage,
}: ButtonProp) {
	const style =
		`${
			createPage ? "" : "px-[24px]"
		} pt-[17px] pb-[16px]  rounded-full font-bold text-[12px] tracking-[-0.25px] leading-[15px] bounce-effect` +
		" " +
		className;

	return (
		<button onClick={onClick} className={style} type={type}>
			{children}
		</button>
	);
}
