"use client";

import { useResponsive } from "../context/ResponsiveContext";
import { useTheme } from "../context/themeContext";

type WrapperProps = {
	children: React.ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
	const { isMobile, isTablet, isDesktop } = useResponsive();
	const { isLight } = useTheme();

	let style = "mx-6 my-8";
	if (isMobile) {
		style = "mx-6 my-8";
	} else if (isTablet) {
		style = "mx-12 mt-14 mb-12";
	}

	let top = "my-8";
	if (isMobile) {
		top = "my-8";
	} else if (isTablet) {
		top = "mt-14 mb-12";
	}

	return (
		<main className={`main ${isLight ? "light" : "dark"} ${top}`}>
			<div className={`main ${style} h-full`}>{children}</div>
		</main>
	);
}
