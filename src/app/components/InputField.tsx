import { ChangeEvent } from "react";
import { useTheme } from "../context/themeContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type InputFieldProps = {
	label: string;
	name: string;
	type: "text" | "number" | "email" | "date" | "dropdown";
	value: string;
	onChange: (value: string) => void;
	error?: string;
	isEdit?: boolean;
};

const InputField = ({
	label,
	name,
	type,
	value,
	onChange,
	error,
	isEdit,
}: InputFieldProps) => {
	const { isLight } = useTheme();
	const today = new Date();

	// if (type === "date") {
	// 	if (value === null || value.length < 1 || value === undefined) {
	// 		value = formatDate(new Date());
	// 	}
	// 	console.log(value);
	// 	console.log(isEdit);
	// }

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		onChange(value);
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
				<div className="flex items-center w-full">
					{type == "date" ? (
						// @ts-ignore
						<DatePicker
							selected={value}
							onChange={onChange}
							// className="w-full"
							minDate={today}
							customInput={
								<input
									className={`rounded-[4px]  border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] leading-[15px] ${
										isLight
											? "text-[#0C0E16] border-[#DFE3FA]"
											: "bg-[#1E2139] border-[#252945] text-[#fff]"
									}`}
									value={value}
									disabled={isEdit}
								/>
							}
							dateFormat="yyyy-MM-dd"
							// calendarContainer={MyContainer}
							disabled={isEdit}
						/>
					) : (
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
					)}
					{/* {type === "date" && (
						<FaCalendarAlt size={24} className="text-lg cursor-pointer" />
					)} */}
				</div>

				{error && <p style={{ color: "red" }}>{error}</p>}
			</div>
		</>
	);
};

// const MyContainer = ({ className, children }) => {
// 	return (
// 		<div>
// 			<CalendarContainer className={className}>
// 				{/* <div style={{ background: "#f0f0f0" }}>Pick a start date?</div> */}
// 				<div style={{ position: "relative" }}>{children}</div>
// 			</CalendarContainer>
// 		</div>
// 	);
// };

export default InputField;
