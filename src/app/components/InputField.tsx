import { ChangeEvent } from "react";
import { useTheme } from "../context/themeContext";

type InputFieldProps = {
	label: string;
	name: string;
	type: "text" | "number" | "email" | "date" | "dropdown";
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
	label,
	name,
	type,
	value,
	onChange,
}: InputFieldProps) => {
	const { isLight } = useTheme();

	return (
		<div className="w-full mb-[24px]">
			<label
				className={`font-medium text-[12px] tracking-[-0.25px]  ${
					isLight ? "text-[#7E88C3]" : "text-[#888EB0]"
				} leading-[15px] mb-[10px]`}
				htmlFor={name}
			>
				{label}
			</label>
			<input
				className={`w-full rounded-[4px]  border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] leading-[15px] ${
					isLight
						? "text-[#0C0E16] border-[#DFE3FA]"
						: "bg-[#1E2139] border-[#252945] text-[#fff]"
				}`}
				id={name}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default InputField;
