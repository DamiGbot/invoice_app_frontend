"use client";

import React from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import withAuth from "../components/withAuth";
import LoadingComponent from "../components/UI/Loading";
import FeedbackModal from "../components/FeedbackModal";
import { useResponsive } from "../context/ResponsiveContext";

const Layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);
	const { isDesktop } = useResponsive();

	if (loading) {
		return <LoadingComponent />;
	}

	if (isLoggedIn) {
		return (
			<>
				<Nav /> {children}
				{isDesktop && <FeedbackModal />}
			</>
		);
	}
};

export default withAuth(Layout);
