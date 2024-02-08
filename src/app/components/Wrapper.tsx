type WrapperProps = {
	children: React.ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
	return <main className="main mx-6 my-8">{children}</main>;
}
