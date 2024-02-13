"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";

type ThemeProviderProps = {
	children: ReactNode;
};

type ThemeContextType = {
	isLight: boolean;
	toggleTheme: () => void;
};

const defaultState = {
	isLight: true,
	toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultState);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const [isLight, setIsLight] = useState<boolean>(true);

	// useEffect(() => {
	// 	const storedThemePreference = localStorage.getItem("isLightTheme");
	// 	if (storedThemePreference) {
	// 		setIsLight(storedThemePreference === "true");
	// 	} else {
	// 		const systemPreference = window.matchMedia(
	// 			"(prefers-color-scheme: light)"
	// 		).matches;
	// 		setIsLight(systemPreference);
	// 		localStorage.setItem("isLightTheme", String(systemPreference));
	// 	}
	// }, []);

	const toggleTheme = () => {
		setIsLight(!isLight);
		console.log(isLight);
		// localStorage.setItem("isLightTheme", String(!isLight));
	};

	return (
		<ThemeContext.Provider value={{ isLight, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
