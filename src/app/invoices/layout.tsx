"use client";

import React from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import withAuth from "../components/withAuth";
import LoadingComponent from "../components/UI/Loading";

const Layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);

	if (loading) {
		return <LoadingComponent />;
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
