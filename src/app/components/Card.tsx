type CardProps = {
	children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
	return <div className="bg-[#ffffff] p-[24px] rounded-[8px]">{children}</div>;
}
