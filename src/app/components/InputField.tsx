import { ChangeEvent } from "react";
import { useTheme } from "../context/themeContext";

type InputFieldProps = {
	label: string;
	name: string;
	type: "text" | "number" | "email" | "date" | "dropdown";
	value: string;
	onChange: (value: string) => void;
	error?: string;
};

const InputField = ({
	label,
	name,
	type,
	value,
	onChange,
	error,
}: InputFieldProps) => {
	const { isLight } = useTheme();

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const trimmedValue = e.target.value;
		onChange(trimmedValue);
	};

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
				onChange={handleInputChange}
			/>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
	);
};

export default InputField;
