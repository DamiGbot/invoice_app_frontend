import { ChangeEvent } from "react";

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
}: InputFieldProps) => (
	<div className="w-full mb-[24px]">
		<label
			className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px] mb-[10px]"
			htmlFor={name}
		>
			{label}
		</label>
		<input
			className="w-full rounded-[4px] border-[#DFE3FA] border pl-[19px] py-[16px] font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]"
			id={name}
			name={name}
			type={type}
			value={value}
			onChange={onChange}
		/>
	</div>
);

export default InputField;
