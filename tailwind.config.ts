import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			boxShadow: {
				custom: "0 4px 4px rgba(0, 0, 0, 0.25)",
			},
		},
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			const newUtilities = {
				".bounce-effect": {
					cursor: "pointer",
					transition: "transform 150ms ease-out",
					"&:hover": {
						transform: "scale(1.04)",
					},
					"&:active": {
						transform: "scale(0.95)",
					},
				},
			};
			addUtilities(newUtilities);
		}),
	],
};
export default config;
