"use client";

import { useResponsive } from "../context/ResponsiveContext";
import { useTheme } from "../context/themeContext";

type WrapperProps = {
	children: React.ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
	const { isMobile, isTablet, isDesktop } = useResponsive();
	const { isLight } = useTheme();

	let style = "my-20 w-3/5";
	if (isMobile) {
		style = "mx-6 mt-12 mb-6";
	} else if (isTablet) {
		style = "mx-12 mt-14 mb-12";
	}

	let top = "flex items-center justify-center w-full";
	if (isMobile) {
		top = "mt-12 pb-6";
	} else if (isTablet) {
		top = "mt-14 pb-6";
	}

	return (
		<main className={`main ${isLight ? "light" : "dark"} ${top}`}>
			<div className={`main ${style} h-full`}>{children}</div>
		</main>
	);
}
