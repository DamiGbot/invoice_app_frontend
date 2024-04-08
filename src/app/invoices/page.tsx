"use client";

import React from "react";
import Wrapper from "../components/Wrapper";
import InvoiceList from "../components/InvoiceList";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import withAuth from "../components/withAuth";
import Nav from "../components/Nav";

const Invoice = () => {
	const { isLoggedIn } = useSelector((state: RootState) => state.auth);

	return <Wrapper>{isLoggedIn && <InvoiceList />}</Wrapper>;
};

export default withAuth(Invoice);
