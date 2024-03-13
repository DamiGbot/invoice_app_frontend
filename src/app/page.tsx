"use client";

import ForgotPassword from "./auth/ForgotPassword";
import InvoiceList from "./components/InvoiceList";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import Wrapper from "./components/Wrapper";
import LoginPage from "./auth/page";

export default function Home() {
	return (
		<Wrapper>
			<InvoiceList />

			{/* <LoginPage /> */}
			{/* <Registration /> */}
			{/* <ForgotPassword /> */}
		</Wrapper>
	);
}
