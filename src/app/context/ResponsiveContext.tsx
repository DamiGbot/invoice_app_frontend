"use client";

import { createContext, useContext } from "react";
import useMediaQuery from "../hooks/useMediaQuery";

type ResponsiveContextType = {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
};

const getInitialValues = () => {
	if (typeof window !== "undefined") {
		const width = window.innerWidth;
		return {
			isMobile: width <= 767,
			isTablet: width > 767 && width <= 1023,
			isDesktop: width > 1023,
		};
	}

	return { isMobile: false, isTablet: false, isDesktop: true };
};

const defaultValue: ResponsiveContextType = getInitialValues();

const ResponsiveContext = createContext<ResponsiveContextType>(defaultValue);

type ResponsiveProviderProps = {
	children: React.ReactNode;
};

export const ResponsiveProvider = ({ children }: ResponsiveProviderProps) => {
	const isMobile = useMediaQuery({ width: 767 });
	const isTablet = useMediaQuery({ width: 1023 }) && !isMobile;
	const isDesktop = !isMobile && !isTablet;

	return (
		<ResponsiveContext.Provider value={{ isMobile, isTablet, isDesktop }}>
			{children}
		</ResponsiveContext.Provider>
	);
};

export const useResponsive = () => useContext(ResponsiveContext);
