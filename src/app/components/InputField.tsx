import { ChangeEvent, useRef } from "react";
import { useTheme } from "../context/themeContext";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";

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
	const ref = useRef<HTMLInputElement>(null);

	if (type === "date") {
		console.log(ref);
		console.log(ref.current);
		console.log(ref.current?.click);
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const trimmedValue = e.target.value;
		onChange(trimmedValue);
	};

	return (
		<>
			<div className="w-full mb-[24px] ">
				<label
					className={`font-medium text-[12px] tracking-[-0.25px]  ${
						isLight ? "text-[#7E88C3]" : "text-[#888EB0]"
					} leading-[15px] mb-[10px]`}
					htmlFor={name}
				>
					{label}
				</label>
				<div className="flex items-center">
					{type == "date" ? (
						<DatePicker
							selected={value}
							onChange={onChange}
							customInput={<input className="form-control" />}
							dateFormat="yyyy-MM-dd"
						/>
					) : (
						<input
							ref={ref}
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
					)}
					{type === "date" && (
						<FaCalendarAlt
							size={24}
							className="absolute right-3 text-lg cursor-pointer"
						/>
					)}
				</div>

				{error && <p style={{ color: "red" }}>{error}</p>}
			</div>
		</>
	);
};

export default InputField;
