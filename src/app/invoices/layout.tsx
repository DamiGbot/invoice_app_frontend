"use client";

import React from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import withAuth from "../components/withAuth";

const Layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);

	if (loading) {
		return <h1>Loading.....</h1>;
	}

	if (isLoggedIn) {
		return (
			<>
				<Nav /> {children}
			</>
		);
	}
};

export default withAuth(Layout);
