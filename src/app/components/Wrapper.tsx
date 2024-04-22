"use client";

import { useResponsive } from "../context/ResponsiveContext";
import { useTheme } from "../context/themeContext";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";

type WrapperProps = {
	children: React.ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
	const { isMobile, isTablet } = useResponsive();
	const { isLoggedIn } = useSelector((state: RootState) => state.auth);
	const { isLight } = useTheme();

	let style = "my-20 w-3/5";
	if (isMobile) {
		style = "mx-6 mt-12 mb-6";
	} else if (isTablet) {
		style = "mx-12 mt-14 mb-12";
	}

	let top = "flex items-center justify-center w-full";
	if (isMobile) {
		top = `${isLoggedIn ? "mt-12" : ""} pb-6`;
	} else if (isTablet) {
		top = `${isLoggedIn ? "mt-14" : ""} pb-6`;
	}

	return (
		<main className={`main ${isLight ? "light" : "dark"} ${top}`}>
			<div className={`main ${style} h-full`}>{children}</div>
		</main>
	);
}
