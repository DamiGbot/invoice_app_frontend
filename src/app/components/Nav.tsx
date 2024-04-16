"use client";

import Image from "next/image";
import { useTheme } from "../context/themeContext";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Avatar from "react-avatar";

import logoIcon from "../../../public/assets/logo.svg";
import moonIcon from "../../../public/assets/icon-moon.svg";
import sunIcon from "../../../public/assets/icon-sun.svg";
import imageAvatar from "../../../public/assets/image-avatar.jpg";
import Link from "next/link";
import { useResponsive } from "../context/ResponsiveContext";
import { useDispatch } from "@/app/hooks/useDispatch";
import { logout } from "@/app/lib/features/auth/authSlice";
import { getNameFromToken } from "../helpers/refreshToken";

export default function Nav() {
	const { toggleTheme, isLight } = useTheme();
	const { isDesktop } = useResponsive();
	const pathString = usePathname();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();
	const [name, setName] = useState<string | null>(null);
	const dropdownRef = useRef(null);

	useEffect(() => {
		setDropdownOpen(false);
		setMobileDropdownOpen(false);
	}, [pathString]);

	useEffect(() => {
		const token = localStorage.getItem("accessToken") as string;
		const extractedName = getNameFromToken(token);
		setName(extractedName);
	}, []);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleLogout = () => {
		// Clear local storage or any other storage mechanisms
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");

		// Optional: Dispatch logout action if using Redux to clear user state
		// dispatch(logout());
		dispatch(logout());

		// Redirect to the login page
		router.push("/");
	};

	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setMobileDropdownOpen(false);
			setDropdownOpen(false);
		}
	};

	const handleCloseDropdown = () => {
		setDropdownOpen(false);
		setMobileDropdownOpen(false);
	};

	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	const toggleDropdownMobile = () => setMobileDropdownOpen(!mobileDropdownOpen);

	const firstLetter = name?.[0]?.toUpperCase() || "";

	if (isDesktop) {
		return (
			<nav className="h-screen left-0 top-0 flex flex-col rounded-r-[20px] justify-between bg-[#373B53] navbar">
				<Link href={"/invoices"}>
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
						<div onClick={toggleDropdown} className="cursor-pointer h-[32px]">
							{firstLetter ? (
								<Avatar
									style={{ backgroundColor: "#0b51c1" }}
									name={name}
									size="50"
									round={true}
								/>
							) : (
								<Image
									src={imageAvatar}
									alt="Image avatar"
									width={32}
									height={32}
									className="rounded-full"
								/>
							)}
						</div>
					</div>
				</div>

				{dropdownOpen && (
					<>
						<div
							className="fixed inset-0 bg-black bg-opacity-50 z-10"
							onClick={handleCloseDropdown}
						></div>
						<div className="z-10 absolute bottom-10 left-[4rem] bg-white rounded-lg shadow-lg mt-2 py-2 w-48">
							<Link
								href="/profile"
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>
								Profile
							</Link>
							<div className="border-t border-gray-100"></div>
							<button
								onClick={handleLogout}
								className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>
								Logout
							</button>
						</div>
					</>
				)}
			</nav>
		);
	}

	return (
		<nav className=" relative z-10 w-full flex flex-row justify-between bg-[#373B53] navbar">
			<Link href={"/invoices"}>
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
					<div
						onClick={toggleDropdownMobile}
						className="cursor-pointer h-[32px] flex items-center"
					>
						{firstLetter ? (
							<Avatar
								style={{ backgroundColor: "#0b51c1" }}
								name={name}
								size="50"
								round={true}
							/>
						) : (
							<Image
								src={imageAvatar}
								alt="Image avatar"
								className="w-8 h-8 rounded-full"
							/>
						)}
					</div>
				</div>
			</div>

			{mobileDropdownOpen && (
				<>
					<div
						className="fixed inset-0 bg-black bg-opacity-50 z-10"
						onClick={handleCloseDropdown}
					></div>
					<div
						ref={dropdownRef}
						className="z-10 absolute top-[4rem] right-[1rem] bg-white rounded-lg shadow-lg mt-2 py-2 w-48 transform transition duration-300 ease-out ${isOpen ? 'translate-y-0' : '-translate-y-full opacity-0'}"
					>
						<Link
							href="/profile"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
							Profile
						</Link>
						<div className="border-t border-gray-100"></div>
						<button
							onClick={handleLogout}
							className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
							Logout
						</button>
					</div>
				</>
			)}
		</nav>
	);
}
