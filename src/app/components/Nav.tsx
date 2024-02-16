"use client";

import Image from "next/image";
import { useTheme } from "../context/themeContext";

import logoIcon from "../../../public/assets/logo.svg";
import moonIcon from "../../../public/assets/icon-moon.svg";
import sunIcon from "../../../public/assets/icon-sun.svg";
import imageAvatar from "../../../public/assets/image-avatar.jpg";
import Link from "next/link";
import { useResponsive } from "../context/ResponsiveContext";

export default function Nav() {
	const { toggleTheme, isLight } = useTheme();
	const { isDesktop } = useResponsive();

	if (isDesktop) {
		return (
			<nav className="h-screen left-0 top-0 flex flex-col rounded-r-[20px] justify-between bg-[#373B53] navbar">
				<Link href={"/"}>
					<Image src={logoIcon} alt="This is the logo of the application" />
				</Link>
				<div className="flex flex-col items-center">
					<div onClick={toggleTheme} className="cursor-pointer mb-6">
						{/* This icon has to change and affect the display */}
						{isLight ? (
							<Image src={moonIcon} alt="Moon icon" width={24} height={24} />
						) : (
							<Image src={sunIcon} alt="Sun icon" width={24} height={24} />
						)}
					</div>
					<div className="border-t-2 pt-6 w-full border-[#494E6E] flex justify-center items-center mb-6">
						<Image
							src={imageAvatar}
							alt="Image avatar"
							width={32}
							height={32}
							className="rounded-full"
						/>
					</div>
				</div>
			</nav>
		);
	}

	return (
		<nav className="w-full flex flex-row justify-between bg-[#373B53] navbar">
			<Link href={"/"}>
				<Image src={logoIcon} alt="This is the logo of the application" />
			</Link>
			<div className="flex flex-row items-center">
				<div onClick={toggleTheme} className="cursor-pointer">
					{/* This icon has to change and affect the display */}
					{isLight ? (
						<Image src={moonIcon} alt="Moon icon" />
					) : (
						<Image src={sunIcon} alt="Sun icon" />
					)}
				</div>
				<div className="border-l-2 h-full w-[5rem] ml-6 border-[#494E6E] flex justify-center items-center ">
					<Image
						src={imageAvatar}
						alt="Image avatar"
						className="w-8 h-8 rounded-full"
					/>
				</div>
			</div>
		</nav>
	);
}
