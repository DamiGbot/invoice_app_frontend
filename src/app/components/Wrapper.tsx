"use client";

import { useTheme } from "../context/themeContext";

type WrapperProps = {
	children: React.ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
	const { isLight } = useTheme();

	return (
		<main className={`main ${isLight ? "light" : "dark"}`}>
			<div className="main mx-6 my-8 h-full">{children}</div>
		</main>
	);
}
