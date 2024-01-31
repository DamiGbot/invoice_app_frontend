import Image from "next/image";
import logoIcon from "../../../public/assets/logo.svg";
import moonIcon from "../../../public/assets/icon-moon.svg";
import imageAvatar from "../../../public/assets/image-avatar.jpg";

export default function Nav() {
	return (
		<nav className="w-full flex flex-row justify-between bg-[#373B53] ">
			<div>
				<Image src={logoIcon} alt="This is the logo of the application" />
			</div>
			<div className="flex flex-row items-center">
				<div>
					{/* This icon has to change and affect the display */}
					<Image src={moonIcon} alt="Moon icon" />
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
